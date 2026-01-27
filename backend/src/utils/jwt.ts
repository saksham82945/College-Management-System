import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/index';

export interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
}

export const generateTokens = (payload: JWTPayload) => {
  const signOptions: any = {
    expiresIn: config.jwt.expiresIn,
  };
  const accessToken = jwt.sign(payload, config.jwt.secret as string, signOptions);

  const refreshSignOptions: any = {
    expiresIn: config.jwt.refreshExpiresIn,
  };
  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret as string, refreshSignOptions);

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret) as JWTPayload;
  } catch (error) {
    return null;
  }
};
