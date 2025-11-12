import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as z from "zod";

const validateInternationalPhone = (phone: string) => {
  if (!phone.trim()) {
    return false;
  }
  
  try {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.isValid() || false;
  } catch {
    return false;
  }
};

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(50),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(50),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string()
    .min(5, { message: "Phone number is too short" })
    .max(20, { message: "Phone number is too long" })
    .refine(validateInternationalPhone, { 
      message: "Please enter a valid international phone number (+...)" 
    }),
  address: z.string().min(10, { message: "Address must be at least 10 characters long" }).max(200),
  city: z.string().min(2, { message: "City must be at least 2 characters long" }).max(100),
  zipCode: z.string().min(4, { message: "ZIP / Postal code must be at least 4 characters long" }).max(20),
  deliveryInstructions: z.string().max(500).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;