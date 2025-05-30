import app from './app';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📚 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, fechando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recebido SIGINT, fechando servidor...');
  process.exit(0);
});

startServer();
