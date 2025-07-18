import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend en http://localhost:' + port);
});

// Puedes agregar más rutas aquí...

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
