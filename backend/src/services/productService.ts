import { Product } from "../entities/Product";
import { productRepository } from "../repositories/productRepository";
import {NotFound, Conflict} from "http-errors";

class ProductService {
    async createProduct(productData: Partial<Product>): Promise<Product> {
        return await productRepository.createProduct(productData);
    };

    async getProductById(id: number): Promise<Product | null> {
        const product = await productRepository.getProductbyId(id);
        if (!product) {
            throw new Conflict("Product not found");
        };

        return product;
    };

    
    async updateProduct(id: number, updateData: Partial<Product>): Promise <Product | null> {
        console.log("Accesing service product... ")
        const product = await productRepository.updateProduct(id, updateData)
        console.log("Product from service: ", product)
        return await this.getProductById(id);
    }
/*
    async deleteUser(id: number): Promise<void>{
        await userRepository.deleteUser(id);
    }
*/
}

export const productService = new ProductService();