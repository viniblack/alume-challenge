import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '5m';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não foi definida')
}

/**
 * Gera hash da senha
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
  * Verifica se a senha está correta
  */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Gera token JWT com expiração de 5 minutos
 */
export const generateToken = (payload: { userId: string, email: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica e decodifica token JWT
 */
export const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return {
      userId: decoded.userId,
      email: decoded.email
    };
  } catch (error) {
    return null
  }
}

/**
 * Extrai token do header Authorization
 */
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7)
}