import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Categories } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/app.Error";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  size,
  address,
  categoryId,
  value,
}: IPropertyRequest): Promise<Property> => {
  if (address.state.length > 2) throw new AppError("State undefined", 400);
  if (address.zipCode.length > 8) throw new AppError("Zipcode undefined", 400);

  const propertyRepository = AppDataSource.getRepository(Property);
  const adressRepository = AppDataSource.getRepository(Address);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const addressAlredyExists = await propertyRepository.findOneBy({
    address: address,
  });

  if (addressAlredyExists)
    throw new AppError("This adress alredy been used", 400);

  const createAddress: Address = adressRepository.create({
    ...address,
  });

  await adressRepository.save(createAddress);

  let property: Property;

  if (categoryId) {
    const category = await categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) throw new AppError("Category not found", 404);

    property = propertyRepository.create({
      address: createAddress,
      category,
      size,
      sold: false,
      value,
    });
  } else {
    property = propertyRepository.create({
      address: createAddress,
      size,
      sold: false,
      value,
    });
  }

  await propertyRepository.save(property);

  return property;
};

export { createPropertyService };
