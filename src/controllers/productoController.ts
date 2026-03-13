import { PrismaClient } from "@prisma/client";
import { ProductoBody } from "../interfaces/productoInterface";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProductos = async (req: Request, res: Response) => { 
    const productos = await prisma.producto.findMany({
        include: { categoria: true }
    });
    res.json(productos);
}

export const crearProductos = async(req: Request, res: Response) => {
    const {nombre, precio, categoriaId} = req.body as ProductoBody
    if (!req.body.nombre || !req.body.precio || !req.body.categoriaId) {
        return res.status(400).json({ mensaje: 'Nombre, precio y categoriaID son requeridos' });
    }
    const nuevoProducto = await prisma.producto.create({
        data: { nombre, precio, categoriaId }
    })
    res.status(201).json(nuevoProducto);
};

export const getProductoById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const producto = await prisma.producto.findUnique({
        where: { id },
        include: { categoria: true }
    })
    if(!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado'});
    }
    res.json(producto);
}

export const actualizarProducto = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const {nombre, precio, categoriaId} = req.body as ProductoBody

    if (!req.body.nombre || !req.body.precio || !req.body.categoriaId) {
        return res.status(400).json({ mensaje: 'Nombre, precio y categoriaId son requeridos' });
    }

    const producto = await prisma.producto.findUnique({ where: { id } });
    if(!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const productoEditado = await prisma.producto.update({
        where: { id },
        data: { nombre, precio, categoriaId }
    })
    res.json(productoEditado);
}

export const eliminarProducto = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const producto = await prisma.producto.findUnique({ where: { id } })
    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    await prisma.producto.delete({ where: { id } });
    res.json({ mensaje: 'Producto eliminado' });
}

export const filtrarProducto = async(req: Request, res: Response) => {
    if(!req.query.nombre){
        return res.status(400).json({ mensaje: 'Nombre es requerido' });
    }
    const nombre = req.query.nombre as string;
    const productos = await prisma.producto.findMany({
        where: { nombre },
        include: { categoria: true }
    })
    if(productos.length === 0) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(productos);
}