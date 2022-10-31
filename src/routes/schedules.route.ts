import { Router } from "express";
import {
  listAllSchedulesController,
  scheduleVisitsController,
} from "../controllers/schedules.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

const shedulesRoute = Router();

shedulesRoute.post("", ensureAuthMiddleware, scheduleVisitsController);
shedulesRoute.get("/properties/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, listAllSchedulesController);

export { shedulesRoute };
