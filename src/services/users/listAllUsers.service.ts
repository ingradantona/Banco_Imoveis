import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const listAllUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const AllUsers: User[] = await userRepository.find();

  const UsersWithoutPassword = AllUsers.map((element) => {
    return {
      name: element.name,
      email: element.email,
      id: element.id,
      createdAt: element.createdAt,
      updatedAt: element.updatedAt,
      isActive: element.isActive,
      isAdm: element.isAdm,
    };
  });

  return UsersWithoutPassword;
};

export { listAllUsersService };
