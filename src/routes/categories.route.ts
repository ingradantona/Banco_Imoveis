import { Router } from "express";
import {
  createCategoryController,
  listAllcategoriesController,
  ListCategoriesByPropertiesController,
} from "../controllers/categories.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

const categoryRoute = Router();

categoryRoute.post("", ensureAuthMiddleware, ensureIsAdmMiddleware, createCategoryController);
categoryRoute.get("", listAllcategoriesController);
categoryRoute.get("/:id/properties", ListCategoriesByPropertiesController)

export { categoryRoute };
