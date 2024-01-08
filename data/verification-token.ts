import { db } from '@/lib/db';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    console.log('verificationToken:', verificationToken);
    return verificationToken;
  } catch {
    return null;
  }
};
