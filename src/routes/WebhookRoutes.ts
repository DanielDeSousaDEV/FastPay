import { Router } from 'express';
import { AsaasWebhookController } from '../controllers/AsaasWebhookController';

const WebhookRoutes = Router();

WebhookRoutes.post('/webhooks/asaas', AsaasWebhookController.handleWebhook);

export default WebhookRoutes;
