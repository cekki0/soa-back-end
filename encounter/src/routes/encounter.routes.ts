import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";
import validateRequest from "../middleware/validateRequest";
import {
  CreateEncounterInput,
  createEncounterSchema,
} from "../schema/encounter.schema";

const router = Router();

const service = new EncounterService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

router.post(
  "/",
  validateRequest(createEncounterSchema),
  async (req: Request<{}, {}, CreateEncounterInput["body"]>, res: Response) => {
    //autcomplete za req.body.
    res.sendStatus(200);
  }
);

export default router;
