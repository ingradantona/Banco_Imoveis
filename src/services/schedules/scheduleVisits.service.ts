import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { UserProperties } from "../../entities/schedulesUserProperties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.Error";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleVisitsService = async ({ date, hour, propertyId, userId,}: IScheduleRequest) : Promise<UserProperties> => {
  const checkDate = new Date(`${date} ${hour}`);
  if (!checkDate) throw new AppError("Invalid date or hour", 400);

  if (checkDate.getHours() < 8 || checkDate.getHours() >= 18) throw new AppError("Schedule a visit during business hours", 400);

  if (checkDate.getDay() > 5) throw new AppError("Schedule a visit during business days", 400);

  const schedulesRepository = AppDataSource.getRepository(UserProperties);
  const propertyRepository = AppDataSource.getRepository(Property)
  const userRepository = AppDataSource.getRepository(User)

  const property = await propertyRepository.findOneBy({
    id: propertyId
  })

  const user = await userRepository.findOneBy({
    id: userId
  })

  if (!property) throw new AppError("This property does't exists", 404)
  if (!user) throw new AppError("This user does't exists", 404)

  const scheduledVisit = await schedulesRepository.findBy({
    property: {
        id: propertyId
    }
  })


  if(scheduledVisit.length) {
    const alredyExists = scheduledVisit.find( element => {
        const dates = `${element.date}`.split('-').join('/')
        const hours = `${element.hour}`.split(":")

        return dates == date && `${hours[0]}:${hours[1]}` == hour
    }) 

    if(scheduledVisit) throw new AppError("Already have a visit scheduled for this time", 400)
  }


  const visit = schedulesRepository.create({
    date: checkDate,
    hour: checkDate,
    property: property,
    user: user
  })

  await schedulesRepository.save(visit)

  return visit
};

export { scheduleVisitsService };
