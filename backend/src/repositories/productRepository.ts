import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
import { Product } from "../entities/Product";
import { get } from "lodash";

class ProductRepository{
    private repository: Repository<Product>;

    constructor () {
        this.repository = AppDataSource.getRepository(Product);
    };

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.repository.create(productData);
        return await this.repository.save(product);
    }

    async getProductbyId (id: number): Promise<Product | null > {
        return await this.repository.findOneBy({id});
    };

    async updateProduct (id: number, updateData: Partial<Product>): Promise<void> {
        await this.repository.update(id, updateData)
    }

    async deleteProduct (id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export const productRepository = new ProductRepository();