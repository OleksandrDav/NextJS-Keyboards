import { layouts, switches, keyboards } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
  // Create users
  await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        surname: "Smith",
        email: "alice@prisma.io",
        password: hashSync("securepassword1", 10),
        verified: new Date(),
        role: "ADMIN",
      },
      {
        name: "Bob",
        surname: "Johnson",
        email: "bob@prisma.io",
        password: hashSync("securepassword2", 10),
        verified: new Date(),
        role: "USER",
      },
    ],
  });

  // Create layouts
  await prisma.layout.createMany({
    data: layouts,
  });

  // Create switches
  await prisma.switch.createMany({
    data: switches,
  });

  // Fetch created layouts and switches for reference
  const createdLayouts = await prisma.layout.findMany();
  const createdSwitches = await prisma.switch.findMany();

  // Create keyboards with color variants
  for (const keyboard of keyboards) {
    // Find the layout ID
    const layout = createdLayouts.find((l) => l.name === keyboard.layout);
    if (!layout) {
      console.error(`Layout not found: ${keyboard.layout}`);
      continue;
    }

    // Find switch IDs for this keyboard
    const keyboardSwitches = createdSwitches.filter((s) =>
      keyboard.switches.includes(s.name)
    );

    // Create keyboard with relations
    const createdKeyboard = await prisma.keyboard.create({
      data: {
        name: keyboard.name,
        basePrice: keyboard.basePrice,
        description: keyboard.description,
        layoutId: layout.id,
        switches: {
          connect: keyboardSwitches.map((s) => ({ id: s.id })),
        },
        colorVariants: {
          create: keyboard.colorVariants.map((variant, index) => ({
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            imageUrl: variant.imageUrl,
            isDefault: variant.isDefault || false,
            sortOrder: index,
            inStock: variant.inStock,
          })),
        },
      },
    });

    console.log(`Created keyboard: ${createdKeyboard.name}`);
  }

  // Create sample carts with items
  const users = await prisma.user.findMany();
  const allKeyboards = await prisma.keyboard.findMany({
    include: {
      colorVariants: true,
      switches: true,
    },
  });

  if (users.length > 0 && allKeyboards.length > 0) {
    // Create cart for Bob
    const bob = users.find((u) => u.email === "bob@prisma.io");
    if (bob && allKeyboards[0]) {
      const keyboard = allKeyboards[0];
      const colorVariant = keyboard.colorVariants.find((cv) => cv.inStock);
      const switchOption = keyboard.switches.find((s) => s.inStock);

      if (colorVariant && switchOption) {
        const cartPrice =
          Number(keyboard.basePrice) + Number(switchOption.priceModifier);

        await prisma.cart.create({
          data: {
            userId: bob.id,
            token: `token_${bob.id}_${Date.now()}`,
            totalAmount: cartPrice * 2, // 2 items
            cartItems: {
              create: [
                {
                  keyboardId: keyboard.id,
                  colorVariantId: colorVariant.id,
                  switchId: switchOption.id,
                  quantity: 2,
                  price: cartPrice,
                },
              ],
            },
          },
        });
        console.log(`Created cart for user: ${bob.email}`);
      }
    }

    // Create guest cart
    if (allKeyboards[1]) {
      const keyboard = allKeyboards[1];
      const colorVariant = keyboard.colorVariants.find((cv) => cv.inStock);
      const switchOption = keyboard.switches.find((s) => s.inStock);

      if (colorVariant && switchOption) {
        const cartPrice =
          Number(keyboard.basePrice) + Number(switchOption.priceModifier);

        await prisma.cart.create({
          data: {
            token: `guest_token_${Date.now()}`,
            totalAmount: cartPrice,
            cartItems: {
              create: [
                {
                  keyboardId: keyboard.id,
                  colorVariantId: colorVariant.id,
                  switchId: switchOption.id,
                  quantity: 1,
                  price: cartPrice,
                },
              ],
            },
          },
        });
        console.log("Created guest cart");
      }
    }
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Layout" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Switch" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Keyboard" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ColorVariant" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
