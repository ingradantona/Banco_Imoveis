import 'dotenv/config'
import { verify } from "jsonwebtoken"

import { Request, Response, NextFunction } from "express";
import { AppError } from '../errors/app.Error';

const ensureAuthMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if(!token) throw new AppError('Missing authorization token', 401)
    token = token.split(" ")[1] || token

    verify(token, process.env.SECRET_KEY as string, (error, decoded : any) => {
        if(error) throw new AppError('Unauthorized', 401)

        req.user = {
            id : decoded.sub,
            isAdm: decoded.isAdm
        }

        next()
    })
}

export {ensureAuthMiddleware}