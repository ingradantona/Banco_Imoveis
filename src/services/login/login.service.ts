import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"
import 'dotenv/config'

import { IUser, IUserLogin } from "../../interfaces/users"
import { AppError } from "../../errors/app.Error"


const loginService = async ({email, password}: IUserLogin) :Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    if(!email || !password) throw new AppError('Missing information', 403)

    const findUser = await userRepository.findOneBy({
        email: email
    })

    if(!findUser) throw new AppError("Invalid email or password", 403)

    const passwordMatch = await compare(password, findUser.password)

    if(!passwordMatch) throw new AppError("Invalid email or password", 403)

    const token = sign({
        isAdm: findUser.isAdm
    }, process.env.SECRET_KEY as string, {
        expiresIn: '24h',
        subject:findUser.id
    })

    return token
}

export {loginService}