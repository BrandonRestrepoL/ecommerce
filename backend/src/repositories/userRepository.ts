import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

class UserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createUser(userData: Partial<User>): Promise<User> {
        try{
            const user = this.repository.create(userData);
            return await this.repository.save(user);
        } catch (error) {
            console.error("Error creando el usuario", error);
            throw new Error("Error al crear el usuario");
        };
    };

    async getUserByEmail (email: string): Promise<User | null> {
        return await this.repository.findOneBy({email});
    };

    async getUserById (id: number): Promise<User | null > {
        return await this.repository.findOneBy({id});
    };

    async updateUser (id: number, updateData: Partial<User>): Promise<void>{
        await this.repository.update(id, updateData);
    }

    async deleteUser (id: number): Promise<void>{
        await this.repository.delete(id);
    }

    
}

export const userRepository = new UserRepository();