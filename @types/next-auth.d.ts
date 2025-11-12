// types/next-auth.d.ts
import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
    cartToken?: string;
  }

  interface User {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    cartToken?: string;
  }
}