import express from 'express';
import { getCartas, getCartaById, createCarta, updateCarta, deleteCarta,  canjearCartaController  } from '../controllers/cartas.controller.js';

const cardsRouter = express.Router();

cardsRouter.get('/cartas', getCartas);
cardsRouter.get('/cartas/:id', getCartaById);
cardsRouter.post('/cartas', createCarta);
cardsRouter.put('/cartas/:id', updateCarta);
cardsRouter.delete('/cartas/:id', deleteCarta);
cardsRouter.post('/cartas/canjear', canjearCartaController);
 
export default cardsRouter;