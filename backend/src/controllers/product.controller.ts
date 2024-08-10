import { Request, Response } from "express";
import { ProductSchemaType } from "../schemas/product.schema";
import { AppDataSource } from "../dataSource";
import { JWT_SECRET } from "../config";
import { Product } from "../entities/Product";
import jwt from "jsonwebtoken";

export const productHandler = async (
    req: Request<unknown, unknown, ProductSchemaType & {id: number}>,
    res: Response
) => {
    const productRepository = AppDataSource.getRepository(Product);
    //const productFound = await productRepository.findOneBy({id: req.body.id});

    //if (productFound) return res.status(403).json([{message: "Id product found"}]);

    const newProduct = productRepository.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock
    });

    const savedProduct = await productRepository.save(newProduct);

    const token = jwt.sign(
        {
            _id: savedProduct.id,
        },
        JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24,
        }
    );

    return res.json({
        token
    });
}