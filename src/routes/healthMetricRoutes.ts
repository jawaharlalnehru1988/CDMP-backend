import express from 'express';
import { deleteMetrics, getPatientMatrics, submitMetric, updateMetrics } from '../controllers/healthMetricController';
import authMiddleware from '../middleware/authMiddleware';

const metricRouter = express.Router();

metricRouter.post('/create', authMiddleware, submitMetric);
metricRouter.patch('/update/:id', authMiddleware, updateMetrics);
metricRouter.delete('/delete/:id', authMiddleware, deleteMetrics);

metricRouter.get('/', authMiddleware, getPatientMatrics);

export default metricRouter;
