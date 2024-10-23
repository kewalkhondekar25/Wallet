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
          password: { label: "Password", type: "password", required: true }
        },
        async authorize(credentials: any){
          //hash password
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          //check existing user in db
          const existingUser = await db.users.findFirst({
            where: {
              emailAddress: credentials.email
            }
          });
          //if existing user is there check his pwd
          if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password)
            //if pwd is correct return him
            if(isPasswordCorrect){
              return {
                id: existingUser.id.toString(),
                name: existingUser.fullName,
                email: existingUser.emailAddress
              }
            }
            return null;
          }
          
        }

    )
  ]
}
