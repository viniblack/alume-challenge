import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const generateToken = (payload: object) => {
  return jwt.sign({ payload }, JWT_SECRET, { expiresIn: '5m' });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}