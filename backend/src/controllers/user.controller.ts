import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { LoginSchemaType, SignupSchemaType } from "../schemas/user.schema";
import { userService } from "../services/user.service";

export const signupHandler = async (
    req: Request<unknown, unknown, SignupSchemaType>,
    res: Response
) => {
    const {fullName, email, password} = req.body;

    const newUser = await userService.createUser({fullName, email, password})

    const token = jwt.sign(
        {
            _id: newUser.id,
        },
        JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24,
        }
    );

    return res.json({
        token
    });
};

export const loginHandler = async (
    req: Request<unknown, unknown, LoginSchemaType>,
    res: Response
) => { 
    const {email, password} = req.body;
    console.log(email, password)
    const user = await userService.validateUserPassword(email, password)
    const token = jwt.sign(
        {
            _id: user.id,
        },
        JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
    );

    return res.json({
        token,
    });
};

export const getUserHandler = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const user = await userService.getUserById(userId);   
    res.json(user); 
};

export const updateUserHandler = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, updateData)
    res.json(updatedUser);
}

export const deleteUserHandler = async (req: Request, res: Response) =>{
    const userId = req.user._id;
    await userService.deleteUser(userId);

    return res.status(204).send()
}