
import { Request, Response } from 'express';
import { IdentityPlatformService } from './IdentityPlatformService';
import { CreateRequest, UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import { CreateUserDto } from '../dto/CreateUserDto';

const service = new IdentityPlatformService();

export async function createUser(req: Request, res: Response){
    const body = req.body as CreateUserDto;
    if(!body){
        return res.status(400).send({
            message: "Body can't be empty",
            error: "bad request"
        });
    }
    const data: CreateRequest = {
        uid: body.rut,
        email: body.email,
        password: body.password,
        phoneNumber: body.phone,
        displayName: body.name
    }
    try{
        const user = await service.create(data);
        res.json(user);
    }catch(e){
        res.status(500).send(e);
    }
}

export async function updateUser(req: Request, res: Response){
    const body = req.body;
    if(!body){
        return res.status(400).send({
            message: "Body can't be empty",
            error: "bad request"
        });
    }
    const rut = req.params.uid;
    if(!rut){
        return res.status(400).send({
            message: "rut is missing",
            error: "bad request"
        });
    }
    
    
    const data: UpdateRequest = {
        email: body.email,
        password: body.password,
        displayName: body.name,
        phoneNumber: body.phone
    }

    try{
        const user = await service.getUserData(rut);
        data.emailVerified = user.email != data.email ? false : user.emailVerified;
    }catch(e){
        return res.status(404).send({
            message: `User ${rut} not found`,
            error: "not found"
        });
    }

    try{
        const user = await service.update(rut, data);
        res.json(user);
    }catch(error: any){
        res.status(500).send(error);
    }
}

export async function getUser(req: Request, res: Response){
    const rut = req.params.uid;
    if(!rut){
        return res.status(400).send({
            message: "rut is missing",
            error: "bad request"
        });
    }
    try{
        const user = await service.getUserData(rut);
        return res.json(user);
    }catch(e){
        return res.status(404).send({
            message: `User ${rut} not found`,
            error: "not found"
        });
    }
}

export async function deleteUser(req: Request, res: Response){
    const rut = req.params.uid;
    if(!rut){
        return res.status(400).send({
            message: "rut is missing",
            error: "bad request"
        });
    }
    try{
        await service.getUserData(rut);
    }catch(e){
        return res.status(404).send({
            message: `User ${rut} not found`,
            error: "not found"
        });
    }
    try{
        await service.deleteUser(rut);
    }catch(e){
        return res.status(500).send({
            message: e,
            error: "Internal error"
        });
    }
    res.status(200).send({
        message: "User deleted successful"
    });
}
