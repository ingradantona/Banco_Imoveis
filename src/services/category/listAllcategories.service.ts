import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";

const listAllCategoriesService = async(): Promise<Categories[]> => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const categories : Categories[] = await categoryRepository.find()

    return categories
};

export { listAllCategoriesService };
