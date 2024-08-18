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
        if(Object.keys(updateData).length === 0){
            throw new Error("No update provided")
        }
        console.log("Accesing the product repository...");
        console.log("Checking id: ", id, typeof id);
        console.log("id correct. Checking updateData: ", updateData, typeof updateData)
        const product = await this.repository.update(id, updateData)
        console.log("Executing the product repository...")
        console.log("Product from repository: ", product)
    }
}

export const productRepository = new ProductRepository();