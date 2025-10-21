import express from 'express';
import statusMonitor from 'express-status-monitor';
import morgan from 'morgan';
import { env } from './config/env';
import { config } from './config/statusMonitor';
import { ErrorHandler } from './middlewares/ErrorHandler';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(statusMonitor(config));

app.use(ErrorHandler);

app.get('/', (req, res) => {
	res.send('Servidor rodando com Biome + ts-node-dev ⚡');
});

app.get('/up', (req, res) => {
	res.send('Servidor ativo');
});

app.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}`);
});
