import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/StudentController';
import { changePassword, login, logout, registerStudent } from '../controllers/AuthController';
import { createSimulation, getSimulations, getSimulationsSummary, getSimulationsEvolution } from '../controllers/SimulationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  validateSchema,
  registerSchema,
  loginSchema,
  updateStudentSchema,
  financingSimulationSchema,
  changePasswordSchema
} from '../schemas/validationSchemas';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando corretamente' });
});

// ========== ROTAS DE ESTUDANTES ==========
/**
 * POST /api/register - Criação de novo estudante
 */
router.post('/register', validateSchema(registerSchema), registerStudent);

/**
 * POST /api/login - Autenticação
 */
router.post('/login', validateSchema(loginSchema), login);

/**
 * POST /api/logout - Logout estudante
 */
router.post('/logout', logout);

// ========== ROTAS DE ESTUDANTES ==========

/**
 * GET /api/me - Retorna dados do estudante autenticado
 */
router.get('/me', authMiddleware, getProfile);

/**
 * PUT /api/me - Atualiza dados do estudante autenticado
 */
router.put('/me', authMiddleware, validateSchema(updateStudentSchema), updateProfile);

/**
 * PATCH /api/update-password - Atualiza dados do estudante autenticado
 */
router.patch('/change-password', authMiddleware, validateSchema(changePasswordSchema), changePassword);

// ========== ROTAS DE SIMULAÇÕES ==========

/**
 * POST /api/simulations - Cria uma nova simulação
 */
router.post('/simulations', authMiddleware, validateSchema(financingSimulationSchema), createSimulation);

/**
 * GET /api/simulations - Lista todas as simulações do estudante
 */
router.get('/simulations', authMiddleware, getSimulations);

/**
 * GET /api/simulations/summary - 
 * Retorna um resumo das simulações do estudante
 */
router.get('/simulations/summary', authMiddleware, getSimulationsSummary)

/**
 * GET /api/simulations/evolution - 
 * Retorna a evolução das simulações ao longo do tempo
 */
router.get('/simulations/evolution', authMiddleware, getSimulationsEvolution)

/**
 * GET /api/simulations/:id - Busca uma simulação específica
 */
// router.get('/simulations/:id', authMiddleware, getByIdSimulation);

/**
 * DELETE /api/simulations/:id - Deleta uma simulação
 */
// router.delete('/simulations/:id', authMiddleware, deleteSimulation);

export { router };