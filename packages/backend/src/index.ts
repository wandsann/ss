import { createExpressApp } from './config/express';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/logger';

const prisma = new PrismaClient();
const app = createExpressApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Socket.IO events
io.on('connection', (socket) => {
  logger.info(`Cliente conectado: ${socket.id}`);

  socket.on('joinQueue', (sector) => {
    socket.join(sector);
    logger.info(`Cliente ${socket.id} entrou na fila do setor ${sector}`);
  });

  socket.on('leaveQueue', (sector) => {
    socket.leave(sector);
    logger.info(`Cliente ${socket.id} saiu da fila do setor ${sector}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM recebido. Encerrando servidor...');
  await prisma.$disconnect();
  httpServer.close(() => {
    logger.info('Servidor encerrado');
    process.exit(0);
  });
}); 