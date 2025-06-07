import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken
} from '../services/AuthService';
import {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
} from '../schemas/validationSchemas';

import { extractTokenFromHeader, verifyToken } from '../services/AuthService';
import { z } from 'zod';

const prisma = new PrismaClient();

/**
 * POST /api/register - Registro de novo estudante
 */
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password }: RegisterInput = req.body;

    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      res.status(409).json({
        error: 'Email já cadastrado',
        message: 'Já existe um estudante cadastrado com este email'
      });
      return;
    }

    const hashPass = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPass
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const token = generateToken({
      userId: student.id,
      email: student.email
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000
    });

    const refreshToken = generateRefreshToken({ userId: student.id, email: student.email });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.status(201).json({
      message: 'Estudante cadastrado com sucesso',
      student
    });

  } catch (error) {
    console.error('Erro ao registrar estudante:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível cadastrar o estudante'
    });
  }
}

const unauthorized = (res: Response) => {
  res.status(401).json({
    error: 'Credenciais inválidas',
    message: 'Email ou senha incorretos'
  });
  return
}

/**
  * POST /api/login - Autenticação
  */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginInput = req.body

    const student = await prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      return unauthorized(res);
    }

    const passwordIsValid = await comparePassword(password, student.password);
    if (!passwordIsValid) {
      return unauthorized(res);
    }

    const token = generateToken({
      userId: student.id,
      email: student.email
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000
    });

    const refreshToken = generateRefreshToken({ userId: student.id, email: student.email });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.status(200).json({
      message: 'Login realizado com sucesso',
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      },
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível realizar o login'
    });
  }
}

/**
  * POST /api/refresh-token - Atualiza token
  */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ error: 'Refresh token não encontrado' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Refresh token inválido ou expirado' });
    }

    const newToken = generateToken({ userId: decoded.userId, email: decoded.email });

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000
    });

    return res.status(200).json({ message: 'Token renovado com sucesso' });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(500).json({ error: 'Erro ao renovar token' });
  }
}

/**
 * POST /api/logout - Logout estudante
 */
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível realizar o logout'
    });
  }
};

/**
 * PATCH /api/update-password - Atualizar senha do estudante
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword }: ChangePasswordInput = req.body;
    const { user } = req as any; // vindo do middleware

    console.log(user);

    const student = await prisma.student.findUnique({
      where: { id: user.userId }
    });

    if (!student) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isValid = await comparePassword(currentPassword, student.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.student.update({
      where: { id: student.id },
      data: { password: hashedNewPassword }
    });

    return res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar a senha'
    });
  }
};