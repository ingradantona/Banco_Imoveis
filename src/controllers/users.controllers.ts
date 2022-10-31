import { Response, Request } from "express";
import { instanceToPlain } from "class-transformer";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import { createNewUserService } from "../services/users/createNewUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { editUserService } from "../services/users/editUser.service";

const createNewUserController = async (req: Request, resp: Response) => {
  const userReq: IUserRequest = req.body;

  const user: IUser = await createNewUserService(userReq);

  return resp.status(201).json(user).send();
};

const listAllUsersController = async (req: Request, resp: Response) => {
  const users = await listAllUsersService();

  return resp.json(instanceToPlain(users)).send();
};

const editUserController = async (req: Request, resp: Response) => {
  const userInfo: IUserUpdate = req.body;
  const editor = req.user;
  const { id } = req.params;

  const user = await editUserService(userInfo, id, editor);

  return resp.json(user).send();
};

const deleteUserController = async (req: Request, resp: Response) => {
  const { id } = req.params;

  const deleteUser = await deleteUserService(id);

  return resp.status(204).send();
};

export {
  createNewUserController,
  listAllUsersController,
  editUserController,
  deleteUserController,
};
