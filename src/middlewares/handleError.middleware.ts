import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.Error";

const handleErrorMiddleware = (error: Error, req: Request, resp: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return resp.status(error.statusCode).json({ message: error.message }).send()
    }

    return resp.status(500).json({ message: 'Internal server error' }).send()
}

export {handleErrorMiddleware}