import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";
import validateRequest from "../middleware/validateRequest";
import {
  CreateEncounterDto,
  EncounterDto,
  EncounterSchema,
} from "../schema/encounter.schema";
import {
  PositionWithRangeDto,
  PositionWithRangeSchema,
  TouristPoisitionDto,
  TouristPositionSchema,
} from "../schema/touristPosition.schema";

const router = Router();

const service = new EncounterService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
});

router.get("/dragan", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

router.post("/create", async (req, res) => {
  try {
    const encounter = req.body;
    const result = await service.create(encounter);
    return res.sendStatus(200);
  } catch (error) {
    console.error("error while creating encounter:", error);
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
      const result = await service.getInstance(encounterId, userId);
      if (result.success) {
        if (result.value) return res.json(result.value);
        return res.sendStatus(204);
      }
      return res.status(400).json({ message: result.message });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching encounter instances" });
    }
  }
);

router.post(
  "/:encounterId/activate",
  validateRequest(TouristPositionSchema),
  async (
    req: Request<
      { encounterId: string; userId: string },
      {},
      TouristPoisitionDto
    >,
    res: Response
  ) => {
    const encounterId = Number.parseInt(req.params.encounterId);

    const result = await service.activateEncounter(
      req.body.touristId,
      encounterId,
      req.body.longitude,
      req.body.latitude
    );

    if (result.success) return res.json(result.value);

    return res.status(400).json({ message: result.message });
  }
);

router.get(
  "/:encounterId/complete/:userId",
  async (req: Request, res: Response) => {
    const encounterId = Number.parseInt(req.params.encounterId);
    const userId = Number.parseInt(req.params.userId);

    const result = await service.completeEncounter(userId, encounterId);

    if (result.success) return res.json(result.value);

    return res.status(400).json({ message: result.message });
  }
);

router.get(
  "/:encounterId/cancel/:userId",
  async (req: Request, res: Response) => {
    const encounterId = Number.parseInt(req.params.encounterId);
    const userId = Number.parseInt(req.params.userId);

    const result = await service.cancelEncounter(userId, encounterId);

    if (result.success) return res.json(result.value);

    return res.status(400).json({ message: result.message });
  }
);

router.get("/:encounterId", async (req: Request, res: Response) => {
  try {
    const encounter = await service.getById(
      Number.parseInt(req.params.encounterId)
    );
    return res.json(encounter);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
});

router.post(
  "/inRange",
  validateRequest(PositionWithRangeSchema),
  async (req: Request<{}, {}, PositionWithRangeDto>, res: Response) => {
    const result = await service.getAllInRange(req.body);

    if (result.success) return res.json(result.value);

    return res.status(400).json({ message: result.message });
  }
);

router.get("/progress/:userId", async (req: Request, res: Response) => {
  try {
    const progress = await service.getProgress(
      Number.parseInt(req.params.userId)
    );
    return res.json(progress);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
});

export default router;
