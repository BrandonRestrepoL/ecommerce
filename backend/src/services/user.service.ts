import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";
import {NotFound, Conflict} from "http-errors";
import {omit} from "lodash";

class UserService {
    async createUser(userData: Partial<User>): Promise<User> {
        const userFound = await userRepository.getUserByEmail(userData.email!);

        if(userFound){
            throw new Conflict("Email is in use");
        };

        return await userRepository.createUser(userData);
    };

    async validateUserPassword(email: string, password: string): Promise<User> {
        const user = await userRepository.getUserByEmail(email);

        if(!user) {
            throw new NotFound("User not Found");
        };

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword){
            throw new Conflict("Invalid password");
        };

        return user;
    };

    async getUserById(id: number): Promise<User | null> {
        const user = userRepository.getUserById(id);
        if (!user) {
            throw new Conflict("User not found");
        };

        return user;

    };
    
}

export const userService = new UserService();