import { Router } from 'express';
import { registerStudent, login, getProfile, updateProfile } from '../controllers/StudentController';
import { createSimulation, listSimulation } from '../controllers/SimulationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  validateSchema,
  registerSchema,
  loginSchema,
  updateStudentSchema,
  financingSimulationSchema
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
 * GET /api/me - Retorna dados do estudante autenticado
 */
router.get('/me', authMiddleware, getProfile);

/**
 * PUT /api/me - Atualiza dados do estudante autenticado
 */
router.put('/me', authMiddleware, validateSchema(updateStudentSchema), updateProfile);


export { router };