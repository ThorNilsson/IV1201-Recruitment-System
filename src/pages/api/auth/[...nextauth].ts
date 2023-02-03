import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	session: {
		strategy: "jwt",
	},
	callbacks: {},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password",  },
			},
			async authorize(credentials, req) {
				if (credentials?.username == null && credentials?.password == null) return null;

				const user = await prisma.user.findFirst({
					where: { username: credentials.username },
				});

				if (!user) return null;

				//const validPassword = await bcrypt.compare(credentials.password, user.password);

				//if (!validPassword) return null;

				if(credentials.password !== user.password) return null;

				return {
					id: user.id.toString(),
					email: user.id.toString(),
					name: user.username,
					image: user.role_id?.toString(),
				};
			},
		}),
	],
};

export default NextAuth(authOptions);

/*
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
  ],
  */
