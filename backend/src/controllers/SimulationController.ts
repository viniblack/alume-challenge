import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateMonthlyInstallment, calculateTotalInterest, validateParameters } from '../utils/FinancialCalculator';
import { SimulationInput } from '../schemas/validationSchemas';

const prisma = new PrismaClient();

/**
 * POST /api/simulations - Cria uma nova simulação
 */
export const createSimulation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return
    }

    const { totalAmount, monthlyInterestRate, numberOfInstallments }: SimulationInput = req.body;

    const validation = validateParameters(
      totalAmount,
      monthlyInterestRate,
      numberOfInstallments
    )

    if (!validation.isValid) {
      res.status(400).json({
        error: 'Parâmetros de simulação inválidos',
        details: validation.errors
      });
      return
    }

    const monthlyInstallment = calculateMonthlyInstallment(
      totalAmount,
      monthlyInterestRate,
      numberOfInstallments
    )

    const simulation = await prisma.financingSimulation.create({
      data: {
        studentId: userId,
        totalAmount,
        monthlyInterestRate,
        numberOfInstallments,
        monthlyInstallment
      }
    });

    const totalInterest = calculateTotalInterest(
      totalAmount,
      monthlyInstallment,
      numberOfInstallments
    )

    const totalPaid = monthlyInstallment * numberOfInstallments;

    res.status(201).json({
      message: 'Simulação criada com sucesso',
      simulation: {
        id: simulation.id,
        totalAmount: Number(simulation.totalAmount),
        numberOfInstallments: simulation.numberOfInstallments,
        monthlyInterestRate: Number(monthlyInterestRate),
        monthlyInstallment: Number(simulation.monthlyInstallment),
        createdAt: simulation.createdAt,
        totalInterest,
        totalToPay: totalPaid,
        interestPercentage: Math.round((totalInterest / totalAmount) * 100 * 100) / 100
      }
    })

  } catch (error) {
    console.error('Erro ao criar simulação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível criar a simulação'
    });
  }
}

/**
 * GET /api/simulations - Lista todas as simulações do estudante
 */
export const listSimulation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [simulations, total] = await Promise.all([
      prisma.financingSimulation.findMany({
        where: { studentId: userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.financingSimulation.count({
        where: { studentId: userId }
      })
    ])

    const formattedSimulations = simulations.map(simulation => {
      const totalAmount = Number(simulation.totalAmount);
      const installmentValue = Number(simulation.monthlyInstallment)
      const totalInterest = calculateTotalInterest(
        totalAmount,
        installmentValue,
        simulation.numberOfInstallments
      );

      return {
        id: simulation.id,
        totalAmount: totalAmount,
        numberOfInstallments: simulation.numberOfInstallments,
        monthlyInterestRate: Number(simulation.monthlyInterestRate),
        monthlyInstallment: installmentValue,
        createdAt: simulation.createdAt,
        totalInterest: totalInterest,
        totalToPay: installmentValue * simulation.numberOfInstallments,
        interestPercentage: Math.round((totalInterest / totalAmount) * 100 * 100) / 100
      }

    })

    res.status(200).json({
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      },
      simulations: formattedSimulations
    })

  } catch (error) {
    console.error('Erro ao listar simulações:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível listar as simulações'
    });
  }
} 