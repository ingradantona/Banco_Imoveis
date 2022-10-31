import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/app.Error";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({name}: ICategoryRequest): Promise<Categories> => {
  if (!name) throw new AppError("Missing information", 400);

  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryAlredyExists = await categoryRepository.findOneBy({
    name: name,
  });

  if (categoryAlredyExists)
    throw new AppError("This category alredy exists", 400);

  const category: Categories = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

export { createCategoryService };
