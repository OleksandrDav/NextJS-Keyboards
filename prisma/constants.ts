export const layouts = [
  { name: '98% Layout' },
  { name: '80% Layout' },
  { name: '75% Layout' },
  { name: '65% Layout' },
  { name: '60% Layout' }
];

export const switches = [
  { name: "Silent Peach V3", type: "Linear", priceModifier: 0, inStock: true, description: "Ultra-smooth linear switch with silent operation" },
  { name: "Icy Creamsicle", type: "Linear", priceModifier: 5, inStock: true, description: "Creamy smooth linear switch with ice-cold feel" },
  { name: "Flame Orange", type: "Linear", priceModifier: 8, inStock: true, description: "Fast and responsive linear switch" },
  { name: "Apollo Magnetic", type: "Hall Effect", priceModifier: 15, inStock: true, description: "Advanced hall effect magnetic switch with adjustable actuation" },
  { name: "Mist Blue", type: "Linear", priceModifier: 3, inStock: true, description: "Smooth linear switch with subtle tactility" },
  { name: "Ice Blue", type: "Tactile", priceModifier: 6, inStock: true, description: "Crisp tactile switch with satisfying bump" },
  { name: "Matcha Latte", type: "Tactile", priceModifier: 7, inStock: true, description: "Smooth tactile switch with creamy feel" },
  { name: "Kailh Magnetic God", type: "Hall Effect", priceModifier: 18, inStock: false, description: "Premium magnetic switch with ultra-fast response" },
  { name: "Starburst Magnetic", type: "Hall Effect", priceModifier: 16, inStock: true, description: "High-performance magnetic switch for gaming" },
  { name: "Hyacinth", type: "Linear", priceModifier: 4, inStock: true, description: "Buttery smooth linear switch" }
];

export const keyboards = [
  // 98% Layout
  {
    name: "MCHOSE x Unbox Therapy - UT98 Mechanical Keyboard",
    basePrice: 129.99,
    discountPercentage: 15, // ON SALE - 15% off
    layout: "98% Layout",
    description: "Premium 98% mechanical keyboard with Silent Peach V3 switches, featuring a collaboration design with Unbox Therapy.",
    switches: ["Silent Peach V3", "Icy Creamsicle", "Flame Orange"],
    colorVariants: [
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/HW-UT98-2MCHOSEUT98ClassicTherapySilentPeachV3Switch.png?v=1755513039&width=1000", isDefault: true, inStock: true },
      { colorName: "Orange", colorHex: "#FF8C42", imageUrl: "https://www.mchose.store/cdn/shop/files/HW-UT98-4MCHOSEUT98RetroTherapySilentPeachV3Switch.png?v=1755513039&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE K99 V2 Wireless Gasket Mount Mechanical Keyboard",
    basePrice: 149.99,
    discountPercentage: 0, // Not on sale
    layout: "98% Layout",
    description: "Wireless 98% keyboard with premium gasket mount design for superior typing feel and acoustics.",
    switches: ["Icy Creamsicle", "Mist Blue", "Hyacinth"],
    colorVariants: [
      { 
        colorName: "White", 
        colorHex: "#FFFFFF", 
        imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-retro-white-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639466.jpg?v=1754474559&width=1000", 
        isDefault: true, 
        inStock: true,
        additionalImages: [
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 White - Angle View", sortOrder: 1 },
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 White - Top View", sortOrder: 2 },
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 White - Side Profile", sortOrder: 3 }
        ]
      },
      { colorName: "Blue", colorHex: "#87CEEB", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-sky-blue-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639456.jpg?v=1754474550&width=1000", inStock: true },
      { 
        colorName: "Orange", 
        colorHex: "#FF7F50", 
        imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-horizon-orange-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639457.jpg?v=1754474552&width=1000", 
        inStock: false,
        additionalImages: [
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 Orange - Angle View", sortOrder: 1 },
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 Orange - Close-up Detail", sortOrder: 2 },
          { imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", altText: "MCHOSE K99 V2 Orange - Keys Detail", sortOrder: 3 }
        ]
      },
      { colorName: "Black", colorHex: "#2C3E50", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-mountains-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639454.jpg?v=1754474555&width=1000", inStock: true },
      { colorName: "Pink", colorHex: "#FFB6C1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-pink-gradient-icy-creamsicle-switch-mchose-k99-v2-wireless-gasket-mount-mechanical-keyboard-1166639452.jpg?v=1754474558&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE G98 Pro Wireless Tri-Mode Custom Mechanical Gaming Keyboard",
    basePrice: 159.99,
    discountPercentage: 20, // ON SALE - 20% off
    layout: "98% Layout",
    description: "Professional gaming keyboard with tri-mode connectivity (2.4GHz, Bluetooth, Wired) and Flame Orange switches.",
    switches: ["Flame Orange", "Mist Blue", "Hyacinth"],
    colorVariants: [
      { colorName: "Blue", colorHex: "#4169E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-blue-flame-orange-switch-mchose-g98-pro-wireless-tri-mode-custom-mechanical-gaming-keyboard-1166639808.jpg?v=1755569473&width=1000", isDefault: true, inStock: true },
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/HW-G98S-5_785b7d80-4ae2-48f4-8e1a-aa648afb0766.png?v=1755569473&width=1000", inStock: true },
      { colorName: "Gray", colorHex: "#778899", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-gray-and-blue-flame-orange-switch-mchose-g98-pro-wireless-tri-mode-custom-mechanical-gaming-keyboard-1166639807.jpg?v=1755569473&width=1000", inStock: true }
    ]
  },
  // 80% Layout
  {
    name: "MCHOSE K87S Custom Mechanical Gaming Keyboard",
    basePrice: 89.99,
    discountPercentage: 10, // ON SALE - 10% off
    layout: "80% Layout",
    description: "Compact TKL gaming keyboard with premium build quality and customizable RGB lighting.",
    switches: ["Icy Creamsicle", "Mist Blue", "Ice Blue"],
    colorVariants: [
      { colorName: "Black", colorHex: "#2C3E50", imageUrl: "https://www.mchose.store/cdn/shop/files/K87SMountainsGradient.jpg?v=1759915238&width=1000", isDefault: true, inStock: true },
      { colorName: "Pink", colorHex: "#FFE5B4", imageUrl: "https://www.mchose.store/cdn/shop/files/K87SPeachGradient.jpg?v=1759915238&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE Mix 87 Hall Effect Magnetic Switch Gaming Keyboard",
    basePrice: 139.99,
    discountPercentage: 0, // Not on sale
    layout: "80% Layout",
    description: "Advanced hall effect keyboard with Apollo Magnetic switches for ultimate gaming performance.",
    switches: ["Apollo Magnetic", "Kailh Magnetic God", "Starburst Magnetic"],
    colorVariants: [
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-black-apollo-magnetic-switch-mchose-mix-87-hall-effect-magnetic-switch-gaming-keyboard-1177461523.jpg?v=1754474655&width=1000", isDefault: true, inStock: true },
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-white-apollo-magnetic-switch-mchose-mix-87-hall-effect-magnetic-switch-gaming-keyboard-1177461525.jpg?v=1754474651&width=1000", inStock: true },
      { colorName: "Pink", colorHex: "#FF69B4", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-rose-red-apollo-magnetic-switch-mchose-mix-87-hall-effect-magnetic-switch-gaming-keyboard-1177461524.jpg?v=1754474653&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE GX87S Aluminum Custom Mechanical Keyboard",
    basePrice: 119.99,
    discountPercentage: 25, // ON SALE - 25% off
    layout: "80% Layout",
    description: "Premium aluminum construction with Mist Blue switches for a luxurious typing experience.",
    switches: ["Mist Blue", "Icy Creamsicle", "Hyacinth"],
    colorVariants: [
      { colorName: "Black", colorHex: "#2C3E50", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-mountains-gradient-mist-blue-switch-mchose-gx87s-aluminum-custom-mechanical-keyboard-1166639623.png?v=1754474595&width=1000", isDefault: true, inStock: true },
      { colorName: "Brown", colorHex: "#D2B48C", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-milky-brown-mist-blue-switch-mchose-gx87s-aluminum-custom-mechanical-keyboard-1166639622.png?v=1754474597&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE G87 Wireless Gasket Mount Custom Mechanical Keyboard",
    basePrice: 109.99,
    discountPercentage: 0, // Not on sale
    layout: "80% Layout",
    description: "Wireless TKL with gasket mount structure and Ice Blue tactile switches.",
    switches: ["Ice Blue", "Matcha Latte", "Icy Creamsicle"],
    colorVariants: [
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboards-black-topographic-ice-blue-switch-mchose-g87-wireless-gasket-mount-custom-mechanical-keyboard-1166639679.jpg?v=1754474364&width=1000", isDefault: true, inStock: true },
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboards-mchose-g87-wireless-gasket-mount-custom-mechanical-keyboard-1166639680.jpg?v=1754474362&width=1000", inStock: true },
      { colorName: "Pink", colorHex: "#FFC0CB", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboards-mchose-g87-wireless-gasket-mount-custom-mechanical-keyboard-1166639426.jpg?v=1754474366&width=1000", inStock: true },
      { colorName: "Blue", colorHex: "#4169E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboards-mchose-g87-wireless-gasket-mount-custom-mechanical-keyboard-1166639429.jpg?v=1754474372&width=1000", inStock: true }
    ]
  },
  // 75% Layout
  {
    name: "MCHOSE G75 Pro Tri-mode Gasket Structure Gaming Mechanical Keyboard",
    basePrice: 119.99,
    discountPercentage: 12, // ON SALE - 12% off
    layout: "75% Layout",
    description: "Compact 75% gaming keyboard with tri-mode connectivity and Matcha Latte tactile switches.",
    switches: ["Matcha Latte", "Ice Blue", "Hyacinth"],
    colorVariants: [
      { colorName: "Green", colorHex: "#90EE90", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-green-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639824.jpg?v=1754474106&width=1000", isDefault: true, inStock: true },
      { colorName: "Blue", colorHex: "#4169E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-arctic-snow-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639833.jpg?v=1754474090&width=1000", inStock: true },
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-black-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639837.jpg?v=1754474083&width=1000", inStock: true },
      { colorName: "Pink", colorHex: "#FFE4E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-white-pink-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639836.jpg?v=1754474084&width=1000", inStock: true },
      { colorName: "Gray", colorHex: "#808080", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-grey-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639822.jpg?v=1754474109&width=1000", inStock: true },
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-white-topographic-matcha-latte-switch-mchose-g75-pro-tri-mode-gasket-structure-gaming-mechanical-keyboard-1166639575.jpg?v=1756089904&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE Jet 75 Hall Effect Magnetic Switch Gaming Keyboard",
    basePrice: 149.99,
    discountPercentage: 18, // ON SALE - 18% off
    layout: "75% Layout",
    description: "High-performance 75% keyboard with Kailh Magnetic God switches for competitive gaming.",
    switches: ["Kailh Magnetic God", "Starburst Magnetic", "Apollo Magnetic"],
    colorVariants: [
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-white-kailh-magnetic-god-switch-mchose-jet-75-hall-effect-magnetic-switch-gaming-keyboard-1166639420.jpg?v=1754474583&width=1000", isDefault: true, inStock: true },
      { colorName: "Pink", colorHex: "#FF69B4", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-rose-red-kailh-magnetic-god-switch-mchose-jet-75-hall-effect-magnetic-switch-gaming-keyboard-1166639424.jpg?v=1754474587&width=1000", inStock: true },
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-black-topographic-starburst-magnetic-switch-mchose-jet-75-hall-effect-magnetic-switch-gaming-keyboard-1166639422.jpg?v=1754474579&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE X75 V2 Custom Mechanical Keyboard for Office & Gaming",
    basePrice: 99.99,
    discountPercentage: 0, // Not on sale
    layout: "75% Layout",
    description: "Versatile 75% keyboard with Hyacinth switches, perfect for both office work and gaming.",
    switches: ["Hyacinth", "Icy Creamsicle", "Matcha Latte"],
    colorVariants: [
      { colorName: "Green", colorHex: "#90EE90", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-green-hyacinth-switch-mchose-x75-v2-custom-mechanical-keyboard-for-office-gaming-1166639786.jpg?v=1754474182&width=1000", isDefault: true, inStock: true },
      { colorName: "Pink", colorHex: "#FFC0CB", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-pink-hyacinth-switch-mchose-x75-v2-custom-mechanical-keyboard-for-office-gaming-1166639785.jpg?v=1754474185&width=1000", inStock: true },
      { colorName: "Blue", colorHex: "#4169E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-blue-hyacinth-switch-mchose-x75-v2-custom-mechanical-keyboard-for-office-gaming-1166639784.jpg?v=1754474186&width=1000", inStock: true },
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-retro-white-hyacinth-switch-mchose-x75-v2-custom-mechanical-keyboard-for-office-gaming-1166639783.png?v=1754474189&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE Z75S Metal Top Cover Wireless Mechanical Keyboard",
    basePrice: 129.99,
    discountPercentage: 8, // ON SALE - 8% off
    layout: "75% Layout",
    description: "Premium wireless 75% keyboard with durable metal top cover and versatile switch options.",
    switches: ["Icy Creamsicle", "Hyacinth", "Mist Blue"],
    colorVariants: [
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-z75s-metal-top-cover-wireless-mechanical-keyboard-1166639744.jpg?v=1754474266&width=1000", isDefault: true, inStock: true },
      { colorName: "Orange", colorHex: "#FFA500", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-z75s-metal-top-cover-wireless-mechanical-keyboard-1166639746.jpg?v=1758939461&width=1000", inStock: true },
      { colorName: "Pink", colorHex: "#FFC0CB", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-z75s-metal-top-cover-wireless-mechanical-keyboard-1166639745.jpg?v=1754474264&width=1000", inStock: true },
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-z75s-metal-top-cover-wireless-mechanical-keyboard-1166639743.jpg?v=1754474268&width=1000", inStock: true }
    ]
  },
  {
    name: "MCHOSE X75 Wireless Gasket Mount Mechanical Special Edition Thai Keyboard",
    basePrice: 109.99,
    discountPercentage: 0, // Not on sale
    layout: "75% Layout",
    description: "Special edition 75% keyboard with Thai keycaps and premium gasket mount design.",
    switches: ["Hyacinth", "Matcha Latte", "Ice Blue"],
    colorVariants: [
      { colorName: "Blue", colorHex: "#4169E1", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-x75-wireless-gasket-mount-mechanical-special-edition-thai-keyboard-1166639768.jpg?v=1754474216&width=1000", isDefault: true, inStock: true }
    ]
  },
  // 60% Layout
  {
    name: "MCHOSE Ace 60 Hall Effect Magnetic Switch Gaming Keyboard",
    basePrice: 129.99,
    discountPercentage: 15, // ON SALE - 15% off
    layout: "60% Layout",
    description: "Ultra-compact 60% gaming keyboard with hall effect magnetic switches for rapid actuation.",
    switches: ["Apollo Magnetic", "Kailh Magnetic God", "Starburst Magnetic"],
    colorVariants: [
      { colorName: "Black", colorHex: "#000000", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-ace-60-hall-effect-magnetic-switch-gaming-keyboard-1166639723.jpg?v=1754474316&width=1000", isDefault: true, inStock: true },
      { colorName: "White", colorHex: "#FFFFFF", imageUrl: "https://www.mchose.store/cdn/shop/files/mchose-official-keyboard-mchose-ace-60-hall-effect-magnetic-switch-gaming-keyboard-1166639722.jpg?v=1754474318&width=1000", inStock: true }
    ]
  }
];