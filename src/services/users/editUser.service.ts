import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserId, IUserUpdate } from "../../interfaces/users";
import {hash} from 'bcrypt'
import { AppError } from "../../errors/app.Error";

const editUserService = async ({name, email, password }: IUserUpdate, id :string, editor : IUserId) : Promise<IUser> => {
    if(id !== editor.id && !editor.isAdm) throw new AppError("Unauthorized", 401)
    if(!name && !email && !password) throw new AppError("Unauthorized", 401)

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: id
    })

    if(!user) throw new AppError("User does't exists", 404)

    let hashedPassword

    if(password) hashedPassword = await hash(password ,10)

    await userRepository.update(
        id,
        {
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword || user.password
        }
    )

    return {
        name: user.name,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
        isAdm: user.isAdm 
    }

}

export { editUserService }