import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[%]/g, '') // Remove percentage signs
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]/g, '') // Remove special characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};