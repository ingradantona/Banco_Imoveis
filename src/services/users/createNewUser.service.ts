import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";

import { IUser, IUserRequest } from "../../interfaces/users";

import { hash } from "bcrypt";
import { AppError } from "../../errors/app.Error";

const createNewUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  if (!name || !email || !password || isAdm === null || isAdm === undefined)
    throw new AppError("Missing information", 400);

  const findEmail = await userRepository.findOneBy({
    email: email,
  });

  if (findEmail) throw new AppError("This e-mail alredy been used", 400);

  const hashedPassword = await hash(password, 10);

  const user: IUser = userRepository.create({
    name,
    email,
    isAdm,
    isActive: true,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return {
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    id: user.id,
  };
};

export { createNewUserService };
