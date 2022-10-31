import { Response, Request } from "express";
import { IUserLogin } from "../interfaces/users";
import { loginService } from "../services/login/login.service";

const loginController = async (req: Request, resp: Response) => {
  const user: IUserLogin = req.body;

  const token = await loginService(user);

  return resp.json({ token }).send();
};

export { loginController };
