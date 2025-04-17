import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { json } from 'body-parser';
import { errorHandler } from '../middlewares/errorHandler';

export const createExpressApp = () => {
  const app = express();

  // Middlewares básicos
  app.use(helmet()); // Segurança
  app.use(cors()); // CORS
  app.use(compression()); // Compressão
  app.use(json()); // Body parser

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Rotas
  app.use('/api/auth', require('../routes/auth').router);
  app.use('/api/patients', require('../routes/patients').router);
  app.use('/api/doctors', require('../routes/doctors').router);
  app.use('/api/nurses', require('../routes/nurses').router);
  app.use('/api/pharmacists', require('../routes/pharmacists').router);
  app.use('/api/cleaners', require('../routes/cleaners').router);
  app.use('/api/cooks', require('../routes/cooks').router);
  app.use('/api/appointments', require('../routes/appointments').router);
  app.use('/api/medical-records', require('../routes/medicalRecords').router);
  app.use('/api/medications', require('../routes/medications').router);
  app.use('/api/tasks', require('../routes/tasks').router);

  // Handler de erros
  app.use(errorHandler);

  return app;
}; 