import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { router } from './routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Muitas requisições',
    message: 'Tente novamente em alguns minutos'
  }
});
app.use('/api', limiter);

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    error: 'Muitas tentativas de login',
    message: 'Tente novamente em 5 minutos'
  }
});
app.use('/api/login', loginLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.json({
    message: 'API Alume Challenge',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      register: 'POST /api/register',
      login: 'POST /api/login',
      profile: 'GET /api/me',
      updateProfile: 'PUT /api/me',
      createSimulation: 'POST /api/simulations',
      listSimulations: 'GET /api/simulations'
    }
  });
});

app.use('/api', router);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.originalUrl} não existe`
  });
});

export default app;
