// lib/serialize.ts
import { Prisma } from "@prisma/client";

/**
 * Recursively converts Prisma Decimal objects to numbers for serialization
 * Use this when passing Prisma data from Server Components to Client Components
 */
export function serializePrismaData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle Prisma Decimal
  if (data instanceof Prisma.Decimal) {
    return data.toNumber() as T;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map((item) => serializePrismaData(item)) as T;
  }

  // Handle Date objects (keep them as is - Next.js handles these)
  if (data instanceof Date) {
    return data;
  }

  // Handle plain objects
  if (typeof data === "object" && data.constructor === Object) {
    const serialized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        serialized[key] = serializePrismaData((data as any)[key]);
      }
    }
    return serialized as T;
  }

  // Return primitives as is
  return data;
}

// Type-safe version for specific models
export function serializeKeyboard<T extends { basePrice?: any }>(keyboard: T) {
  return serializePrismaData(keyboard);
}

export function serializeCart<T extends { totalAmount?: any }>(cart: T) {
  return serializePrismaData(cart);
}

export function serializeCartItem<T extends { price?: any }>(cartItem: T) {
  return serializePrismaData(cartItem);
}

export function serializeOrder<T extends { totalAmount?: any }>(order: T) {
  return serializePrismaData(order);
}