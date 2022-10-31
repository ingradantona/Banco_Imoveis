import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.Error";

const ensureIsAdmMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    const {isAdm} = req.user

    if(!isAdm) throw new AppError('Unauthorized', 403)
    
    next()   
}

export {ensureIsAdmMiddleware}