import { Router } from "express";

import { 
    createNewUserController, 
    deleteUserController, 
    editUserController, 
    listAllUsersController
} from "../controllers/users.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

const usersRoute = Router()

usersRoute.post('', createNewUserController)
usersRoute.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listAllUsersController)
usersRoute.patch('/:id', ensureAuthMiddleware, editUserController)
usersRoute.delete('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController)

export { usersRoute }