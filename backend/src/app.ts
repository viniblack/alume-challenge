import express from 'express';
import studentRoutes from './routes/students'

const app = express();

app.use(express.json());
app.use('/api', studentRoutes);

export default app;
