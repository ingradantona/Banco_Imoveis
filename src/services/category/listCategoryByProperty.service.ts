import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/app.Error";

const listCategoriesByPropertiesService = async ( id: string ): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const properties = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (properties) {
    return properties;
  } else {
    throw new AppError("Category not found", 404);
  }
};

export { listCategoriesByPropertiesService };
