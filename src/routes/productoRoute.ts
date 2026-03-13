import { Router } from "express";
import { actualizarProducto, crearProductos, eliminarProducto, filtrarProducto, getProductoById, getProductos } from "../controllers/productoController";


const router = Router();

router.get('/', getProductos);
router.post('/', crearProductos);
router.get('/:id', getProductoById);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);
router.get('/filtrar', filtrarProducto);

export default router