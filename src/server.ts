import express from 'express';
import statusMonitor from 'express-status-monitor';
import morgan from 'morgan';
import { env } from './config/env';
import { config } from './config/statusMonitor';
import { ErrorHandler } from './middlewares/ErrorHandler';
import CostumersRoutes from './routes/CostumersRoutes';
import ChargesRoutes from './routes/ChargesRoutes';
import WebhookRoutes from './routes/WebhookRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../openapi.json';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(statusMonitor(config));

app.use(CostumersRoutes);
app.use(ChargesRoutes);
app.use(WebhookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/up', (_req, res) => {
	res.send('Servidor ativo');
});

app.use(ErrorHandler);

app.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}`);
});
