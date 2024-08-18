import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
import { Product } from "../entities/Product";

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
}

export const productRepository = new ProductRepository();