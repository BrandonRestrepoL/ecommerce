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

    /*
    async updateUser(id: number, updateData: Partial<User>): Promise <UserDto | null> {
        await userRepository.updateUser(id, updateData);
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void>{
        await userRepository.deleteUser(id);
    }
*/
}

export const productService = new ProductService();