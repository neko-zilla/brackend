import { Router } from 'express';
import { obtenerHistorialCartasController } from '../controllers/historial.controller.js';

const router = Router();

router.get('/:id_usuario', obtenerHistorialCartasController);

export default router;