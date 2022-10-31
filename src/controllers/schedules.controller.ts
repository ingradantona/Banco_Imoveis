import { Request, Response } from "express";
import { listAllSchedulesService } from "../services/schedules/listAllSchedules.service";
import { scheduleVisitsService } from "../services/schedules/scheduleVisits.service";

const scheduleVisitsController = async (req: Request, resp: Response) => {
  const schedulesReq = req.body;

  const schedules = await scheduleVisitsService(schedulesReq);

  return resp.status(201).json({ message: "Visit have been schedules" }).send();
};

const listAllSchedulesController = async (req: Request, resp: Response) => {
  const { id } = req.params;

  const schedules = await listAllSchedulesService(id)

  return resp.json({schedules}).send
};

export { scheduleVisitsController, listAllSchedulesController };
