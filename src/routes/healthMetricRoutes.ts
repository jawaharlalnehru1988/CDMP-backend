import express from 'express';
import { getPatientMatrics, submitMetric } from '../controllers/healthMetricController';
import authMiddleware from '../middleware/authMiddleware';

const metricRouter = express.Router();

metricRouter.post('/create', authMiddleware, submitMetric);
metricRouter.get('/', authMiddleware, getPatientMatrics);

export default metricRouter;
