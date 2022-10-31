import AppDataSource from "../../data-source"
import { Property } from "../../entities/property.entity"
import { UserProperties } from "../../entities/schedulesUserProperties.entity"
import { AppError } from "../../errors/app.Error"

const listAllSchedulesService = async (id: string) => {
    const schedulesRepository = AppDataSource.getRepository(UserProperties)
    const propertiesRepository = AppDataSource.getRepository(Property)
    const property = await propertiesRepository.findBy({
        id:id
    })
    
    if(!property) throw new AppError("This property doesn't exists", 400)
    
    const schedules = await schedulesRepository.find({
        where: {
            property: {
                id: id
            }
        },
        relations: {
            user: true
        }
    })
    
    if(!schedules.length) throw new AppError("Schedules not found", 404)

    return schedules
}

export {listAllSchedulesService}