import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name || profile.name?.split(" ")[0] || "",
          lastName: profile.family_name || profile.name?.split(" ")[1] || "",
          image: profile.picture,
          role: "USER" as UserRole,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          firstName: profile.name?.split(" ")[0] || profile.login,
          lastName: profile.name?.split(" ")[1] || "",
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findUnique({
          where: values,
        });
        

        if (!findUser) {
          throw new Error("No user found with this email");
        }
        
        if (!findUser.verified) {
          throw new Error("Please verify your email before logging in");
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: findUser.id.toString(),
          email: findUser.email,
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          role: findUser.role,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              {
                email: user.email,
              },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            firstName: user.firstName || "User #" + Date.now(),
            lastName: user.lastName || "*",
            password: hashSync(Math.random().toString(36).slice(-8), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });
        return true;
      } catch (error) {
        console.error("Error [NextAuth signIn]", error);
        return false;
      }
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (!token.email) {
        return token;
      } 

      const findUser = await prisma.user.findUnique({
        where: { email: token.email },
        include: {
          carts: true,
        },
      });

      if (findUser) {
        token.id = findUser.id.toString();
        token.email = findUser.email;
        token.firstName = findUser.firstName;
        token.lastName = findUser.lastName;
        token.role = findUser.role;
        
        // Add cart token to JWT if user has a cart
        if (findUser.carts) {
          token.cartToken = findUser.carts.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        
        // Add cartToken to session
        if (token.cartToken) {
          session.cartToken = token.cartToken as string;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };