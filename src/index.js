/* import 'dotenv/config';
import express from 'express';
import mazosRouter from './routes/mazos.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import cardsRouter from './routes/cartas.routes.js'
import historialRoutes from './routes/historial.routes.js'
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:4321' }));
app.use(express.json());

app.use('/api', cardsRouter);
app.use('/api', mazosRouter);
app.use('/api', usuariosRouter);
app.use('/api/historial', historialRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */

// server.js
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

import mazosRouter from './routes/mazos.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import cardsRouter from './routes/cartas.routes.js';
import historialRoutes from './routes/historial.routes.js';

const app = express();

app.use(express.json());

// Rutas
app.use('/api', cardsRouter);
app.use('/api', mazosRouter);
app.use('/api', usuariosRouter);
app.use('/api/historial', historialRoutes);

// Crear un servidor HTTP a partir de la app de Express
const server = http.createServer(app);

// Crear una instancia de Socket.IO y adjuntarlo al servidor HTTP
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
  }
});

// Manejar eventos de conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exportar app y io si es necesario para otras partes de la aplicación
export { app, io };
