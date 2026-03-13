import { Router } from "express";
import { actualizarCategoria, crearCategorias, eliminarCategoria, filtrarCategoria, getCategorias, getCategroiasById } from "../controllers/categoriaController";


const router = Router();

router.get('/', getCategorias);
router.post('/', crearCategorias);
router.get('/:id', getCategroiasById);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);
router.get('/filtrar', filtrarCategoria);

export default router;