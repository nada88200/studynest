import NextAuth from "next-auth";
import Credentialsprovider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    Credentialsprovider({
        name: "Credentials",
        credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session : {
      strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
      signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export {handler as GET ,handler as POST};