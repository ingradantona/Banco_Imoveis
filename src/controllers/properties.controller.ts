import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createPropertyService } from "../services/property/createPropertie.service";
import { listAllPropertiesService } from "../services/property/listAllProperties.service";

const createPropertyController = async (req: Request, resp: Response) => {
  const propertyReq = req.body;

  const property = await createPropertyService(propertyReq);

  return resp.status(201).json(property).send();
};

const listAllPropertiesController = async (req: Request, resp: Response) => {
  const properties = await listAllPropertiesService();

  return resp.json(instanceToPlain(properties)).send();
};

export { createPropertyController, listAllPropertiesController };
