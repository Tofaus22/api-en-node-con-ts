import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { CategoriaBody } from '../interfaces/CategoriaInterfaces'


const prisma = new PrismaClient();

export const getCategorias = async (req: Request, res: Response) => { 
    const categorias = await prisma.categoria.findMany();
    res.json(categorias)
}

export const crearCategorias = async(req: Request, res: Response) => {
    const {nombre, descripcion} = req.body as CategoriaBody
    if (!req.body.nombre) {
        return res.status(400).json({ mensaje: 'Nombre es requerido' });
    }
    const nuevaCategoria = await prisma.categoria.create({
        data: {
            nombre,
            descripcion
        }
    })
    res.status(201).json(nuevaCategoria);
};

export const getCategroiasById = async(req: Request, res: Response) => {
    if(!req.params.id){
        return res.status(400).json({ mensaje: 'ID de Categoria no encontrado'});
    }

    const id = parseInt(req.params.id as string);
    const buscarCategoria = await prisma.categoria.findUnique({
        where: {id: id}
    })

    if(!buscarCategoria) {
       return res.status(404).json({ mensaje: 'Categoria no encontrada'});
    }else{
        res.json(buscarCategoria);
    }
}

export const actualizarCategoria = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const {nombre} = req.body

    if (!req.body.nombre) {
        return res.status(400).json({ mensaje: 'Nombre debe ser requerido' });
    }

    const categoria = await prisma.categoria.findUnique({where: {id: id}});

    if(!categoria) {
        return res.status(404).json({mensaje: 'Categoria no Encontrado'});
    }

    const categoriaEditar = await prisma.categoria.update({
        where: { id: id },
        data: { nombre }
        })

     res.json(categoriaEditar);   
}

export const eliminarCategoria = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const categoriaDelete = await prisma.categoria.findUnique({
        where: {id: id}
    })
    if (!categoriaDelete) {
        return res.status(404).json({mensaje: 'Usuario no Encontrado'});
    }

    await prisma.categoria.delete({where: {id:id}});
    res.json({mensaje: 'Usuario eliminado'});
};

export const filtrarCategoria = async(req: Request, res: Response) => {
    if(!req.query.nombre){
        return res.status(400).json({ mensaje: 'ID de categoria no encontrado'});
    }

    const nombre = req.query.nombre as string;
    const buscarCategoria = await prisma.categoria.findMany({
        where: {nombre: nombre}
    })

    if(buscarCategoria.length === 0) {
       return res.status(404).json({ mensaje: 'Categoria no encontrada'});
    }else{
        res.json(buscarCategoria);
    }
}

