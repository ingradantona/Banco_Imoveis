import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.Error";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) throw new AppError("User does't exists", 404);

  if (!user.isActive) throw new AppError("User alredy been", 400);

  await userRepository.update(id, {
    isActive: false,
  });

  return;
};

export { deleteUserService };
