import { User } from '../entity/User/User';
import { sign, verify } from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';

const jwtSecret = process.env.JWT_SECRET as string;

export const createRefreshToken = (user: User): string | null => {
  let signedString = null;
  try {
    signedString = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '14d' }
    );
  } catch (err) {
    console.log(err);
  }
  return signedString;
};

export const createAccessToken = (user: User): string => {
  console.log(jwtSecret);
  return sign({ userId: user.id, email: user.email }, jwtSecret, {
    expiresIn: '15m',
  });
};
export const verifyToken = (
  jwtToken: string
): MyContext['jwtPayload'] | null => {
  let payload = null;
  try {
    payload = verify(jwtToken, jwtSecret);
  } catch (err) {
    return null;
  }
  return payload as MyContext['jwtPayload'];
};
