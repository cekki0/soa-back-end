import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";
import validateRequest from "../middleware/validateRequest";
import {
  CreateEncounterDto,
  EncounterSchema,
} from "../schema/encounter.schema";

const router = Router();

const service = new EncounterService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

router.get("/dragan", async (req: Request, res: Response) => {
    const result = await service.getAll();
    res.send(result);
})

router.post('/create', async (req, res) => {
    try {
        const encounter = req.body;
        const result = await service.create(encounter);
        return res.sendStatus(200);
    } catch (error) {
        console.error('error while creating encounter:', error);
        return res.sendStatus(500);
    }
});

router.post(
  "/",
  validateRequest(EncounterSchema),
  async (req: Request<{}, {}, CreateEncounterDto>, res: Response) => {
    try {
      const encounter = req.body;
      const result = await service.create(encounter);
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating encounter:", error);
      return res
        .status(500)
        .json({ message: "error while creating encounter" });
    }
  }
);

router.get(
  "/:encounterId/instance/:userId",
  async (req: Request, res: Response) => {
    try {
      const encounterId = Number.parseInt(req.params.encounterId);
      const userId = Number.parseInt(req.params.userId);
      const result = await service.getInstances(encounterId, userId);
      if (result.success) {
        return res.send(result.value);
      }
      return res.status(400).send(result.message);
    } catch (error) {
      return res.status(500).send("Error fetching encounter instances");
    }
  }
);

export default router;
