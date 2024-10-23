import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import db from "@repo/db/client"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email Address", type: "text", placeholder: "johndoe@gmail.com", required: true },
        password: { label: "Password", type: "password", placeholder: "your password", required: true }
      },
      async authorize(credentials: any) {
        const existingUser = await db.users.findFirst({
          where: {
            emailAddress: credentials.email
          }
        });
        if(existingUser){
          const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password);
          if(isPasswordCorrect){
            return {
              id: existingUser.id.toString(),
              name: existingUser.fullName,
              email: existingUser.emailAddress
            }
          }
          return null;
        }
        return null;
      },
    })
  ],
  secret: process.env.JWT_SECRET || (() => {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  })(),
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    }
  }
}
