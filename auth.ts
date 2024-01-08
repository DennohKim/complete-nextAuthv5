import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { UserRole } from '@prisma/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  events: {
    //verify users signed in with OAuth(google, github);

    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth without email verification
	  console.log({
		user, 
		account
	  })

	  //Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

	  const existingUser = await getUserById(user.id);

	  //prevent sign in workflow if email is not verified
	  if(!existingUser?.emailVerified) return false;

	  // Add 2FA check
	  

	  return true
    },
    async session({ token, session }) {
      console.log({ sessionToken: token });

      //Extend the userID
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      //Extend the user role
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
