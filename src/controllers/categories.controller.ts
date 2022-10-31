import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createCategoryService } from "../services/category/createCategory.Service";
import { listAllCategoriesService } from "../services/category/listAllcategories.service";
import { listCategoriesByPropertiesService } from "../services/category/listCategoryByProperty.service";

const createCategoryController = async (req: Request, resp: Response) => {
  const categoryReq = req.body;

  const category = await createCategoryService(categoryReq);

  return resp.status(201).json(category).send();
};

const listAllcategoriesController = async (req: Request, resp: Response) => {
  const categories = await listAllCategoriesService();

  return resp.json(instanceToPlain(categories)).send;
};

const ListCategoriesByPropertiesController = async (req: Request, resp: Response) => {
  const {id} = req.params

  const properties = await listCategoriesByPropertiesService(id)

  return resp.json(instanceToPlain(properties)).send
}

export { createCategoryController, listAllcategoriesController, ListCategoriesByPropertiesController};
