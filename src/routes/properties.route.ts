import { Router } from "express";
import {
  createPropertyController,
  listAllPropertiesController,
} from "../controllers/properties.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

const propertiesRoute = Router();

propertiesRoute.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController
);
propertiesRoute.get("", listAllPropertiesController);

export { propertiesRoute };
