import { Request, Response } from "express";
import { ProductSchemaType } from "../schemas/product.schema";
import { AppDataSource } from "../dataSource"; 
import { JWT_SECRET } from "../config";
import { Product } from "../entities/Product";
import jwt from "jsonwebtoken";
import { productService } from "../services/productService";
import { userService } from "../services/user.service";

export const createProductHandler = async (
    req: Request<unknown, unknown, ProductSchemaType>,
    res: Response
) => { 
    const {name, price, description, stock} = req.body;

    const product = await productService.createProduct({name, price, description, stock})

    return res.json(product);
};

export const getProductHandler = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const product =  await productService.getProductById(id);
    return res.json(product);
};

export const updateProductHandler = async (req: Request, res: Response) => {
    const {id, ...updateData} = req.body;
    const product = await productService.updateProduct(id, updateData);
    res.json(product);
}

export const deleteProductHandler = async (req: Request, res: Response) => {
    const {id} = req.body;
    await productService.deleteProduct(id);

    return res.status(204).send();
}
