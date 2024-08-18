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
        await productRepository.updateProduct(id, updateData)
        return await this.getProductById(id);
    }

    async deleteProduct(id: number): Promise<void>{
        await productRepository.deleteProduct(id);
    }

}

export const productService = new ProductService();