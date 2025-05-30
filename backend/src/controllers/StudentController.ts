import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  hashPassword,
  comparePassword,
  generateToken
} from '../services/AuthService';
import {
  RegisterInput,
  LoginInput,
  UpdateStudentInput
} from '../schemas/validationSchemas';

const prisma = new PrismaClient();

/**
 * POST /api/register - Registro de novo estudante
 */
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password }: RegisterInput = req.body;

    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (existingStudent) {
      res.status(409).json({
        error: 'Email já cadastrado',
        message: 'Já existe um estudante cadastrado com este email'
      });
      return
    }

    const hashPass = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPass
      }
    });

    const token = generateToken({
      userId: student.id,
      email: student.email
    });

    res.status(201).json({
      message: 'Estudante cadastrado com sucesso',
      student,
      token
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

    res.status(200).json({
      message: 'Login realizado com sucesso',
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      },
      token
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
 * GET /api/me - Retorna dados do estudante autenticado
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const student = await prisma.student.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!student) {
      res.status(404).json({
        error: 'Estudante não encontrado',
        message: 'Os dados do perfil não foram encontrados'
      });
      return
    }

    res.status(200).json({
      student
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível buscar os dados do perfil'
    });
  }
}

/**
 * PUT /api/me - Atualiza dados do estudante autenticado
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const updateData: UpdateStudentInput = req.body

    if (updateData.email) {
      const existingStudent = await prisma.student.findFirst({
        where: {
          email: updateData.email,
          id: { not: userId }
        }
      })

      if (existingStudent) {
        res.status(409).json({
          error: 'Email já está em uso',
          message: 'Este email já está cadastrado'
        });
        return
      }
    }

    const updatedStudent = await prisma.student.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.status(200).json({
      message: 'Perfil atualizado com sucesso',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o perfil'
    });
  }
}