import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};