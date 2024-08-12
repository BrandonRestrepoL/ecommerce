import { User } from "../entities/User";

export class UserDto{
    id: number;
    fullName: string;
    email: string;

    constructor(user: User){
        this.id = user.id,
        this.fullName = user.fullName,
        this.email = user.email
    }   
}

