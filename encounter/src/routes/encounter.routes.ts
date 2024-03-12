import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";

const router = Router();

const service = new EncounterService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

export default router;
