import express from 'express';
import cors from 'cors';
import * as compression from 'compression'; // Modificação aqui
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { json } from 'body-parser';
import { errorHandler } from '../middlewares/errorHandler';

export const createExpressApp = () => {
  const app = express();

  // Middlewares básicos
  app.use(helmet());
  app.use(cors());
  app.use(compression()); // Agora deve funcionar
  app.use(json());

  // Restante do código permanece igual...
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Rotas
  app.use('/api/auth', require('../routes/auth').router);
  // ... outras rotas

  app.use(errorHandler);

  return app;
};