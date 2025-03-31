import express from 'express';
import { getPatientMatrics, submitMetric, updateMetrics } from '../controllers/healthMetricController';
import authMiddleware from '../middleware/authMiddleware';

const metricRouter = express.Router();

metricRouter.post('/create', authMiddleware, submitMetric);
metricRouter.patch('/update/:id', authMiddleware, updateMetrics);

metricRouter.get('/', authMiddleware, getPatientMatrics);

export default metricRouter;
