import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

class UnverifiedEmailError extends CredentialsSignin {
  code = "EMAIL_NOT_VERIFIED";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          omit: { password: false },
        });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        if (!user.emailVerified) throw new UnverifiedEmailError();

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") return profile?.email_verified === true;
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && token.email) {
        const db = await prisma.user.upsert({
          where: { email: token.email.toLowerCase() },
          create: {
            email: token.email.toLowerCase(),
            name: token.name ?? null,
            emailVerified: new Date(),
          },
          update: { emailVerified: new Date() },
        });
        token.id = db.id;
        token.role = db.role;
      } else if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    // ⬇️ This is the block your version was missing
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});




// import NextAuth, { CredentialsSignin } from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";

// // Custom error class extending CredentialsSignin
// class UnverifiedEmailError extends CredentialsSignin {
//   code = "EMAIL_NOT_VERIFIED";
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   // Note: PrismaAdapter is removed from top-level config so it doesn't 
//   // conflict with Credentials / JWT login error handling.
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Credentials({
//       credentials: {
//         email: { label: "Email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const email = credentials?.email as string | undefined;
//         const password = credentials?.password as string | undefined;
//         if (!email || !password) return null;

//         const user = await prisma.user.findUnique({ where: { email } });
//         if (!user || !user.password) return null;

//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return null;

//         // emailVerified is a timestamp (Date/null)
//         if (!user.emailVerified) {
//           throw new UnverifiedEmailError();
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   // auth.ts callbacks: real DB user for Google
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account?.provider === "google") return profile?.email_verified === true;
//       return true;
//     },
//     async jwt({ token, user, account }) {
//       if (account?.provider === "google" && token.email) {
//         const db = await prisma.user.upsert({
//           where: { email: token.email.toLowerCase() },
//           create: { email: token.email.toLowerCase(), name: token.name ?? null, emailVerified: new Date() },
//           update: { emailVerified: new Date() },
//         });
//         token.id = db.id; token.role = db.role;
//       } else if (user) {
//         token.id = user.id; token.role = (user as { role?: string }).role;
//       }
//       return token;
//     },
//   },
// });

