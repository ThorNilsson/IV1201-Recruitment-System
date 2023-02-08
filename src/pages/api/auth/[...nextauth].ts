import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import bcrypt from "bcrypt";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  callbacks: {},
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: { username: credentials.username },
          include: { role: true },
        });

        if (!user) return null;

        //const validPassword = await bcrypt.compare(credentials.password, user.password);

        //if (!validPassword) return null;

        if (credentials.password !== user.password) return null;

        return {
          id: user.id.toString(),
          email: user.id.toString(),
          name: user.username,
          image: user.role.name,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
