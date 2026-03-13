import express from "express";
import cors from 'cors'
import categoriaRoute from './routes/categoriaRoute'
import productoRoute from './routes/productoRoute'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/categorias', categoriaRoute);
app.use('/productos', productoRoute);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
