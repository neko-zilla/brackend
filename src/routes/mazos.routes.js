import express from 'express';
import { getMazos, getMazoById, createMazo, updateMazo, deleteMazo } from '../controllers/mazos.controller.js';

const router = express.Router();

// Rutas para los mazos
router.get('/mazos', getMazos);
router.get('/mazos/:id', getMazoById);
router.post('/mazos', createMazo);
router.put('/mazos/:id', updateMazo);
router.delete('/mazos/:id', deleteMazo);

export default router;