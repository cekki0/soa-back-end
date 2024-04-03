import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";
import validateRequest from "../middleware/validateRequest";
import {
  CreateEncounterDto,
  CreateMiscEncounterDto,
  EncounterSchema,
  MiscEncountersSchema,
  SocialEncounterSchema,
  HiddenEncounterSchema,
  CreateSocialEncounterDto,
  CreateHiddenEncounterDto,
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

router.post(
  "/",
  validateRequest(EncounterSchema),
  async (req: Request<{}, {}, CreateEncounterDto>, res: Response) => {
    try {
      const encounter = req.body;
      const result = await service.createEncounter(encounter);
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
  "/createMiscEncounter/author",
  validateRequest(MiscEncountersSchema),
  async (req: Request<{}, {}, CreateMiscEncounterDto>, res: Response) => {
    try {
      const encounter = req.body;
      const result = await service.createMiscEncounterAuthor(encounter);
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating misc encounter author:", error);
      return res
        .status(500)
        .json({ message: "error while creating misc encounter" });
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

router.post(
  "/:encounterId/completeHiddenEncounter/",
  async (
    req: Request<{ encounterId: string }, {}, TouristPoisitionDto>,
    res: Response
  ) => {
    try {
      const encounterId = Number.parseInt(req.params.encounterId);
      const { longitude, latitude } = req.body;

      const result = await service.completeHiddenEncounter(
        req.body.touristId,
        encounterId,
        longitude,
        latitude
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while completing hidden encounter",
      });
    }
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

router.post(
  "/:encounterId/isUserInRange",
  validateRequest(TouristPositionSchema),
  async (
    req: Request<{ encounterId: string }, {}, TouristPoisitionDto>,
    res: Response
  ) => {
    const result = await service.checkIfUserInCompletionRange(
      Number.parseInt(req.params.encounterId),
      req.body
    );
    if (result.success) return res.sendStatus(200);
    return res.sendStatus(418);
  }
);

router.post(
  "/createMiscEncounter/tourist/:userId",
  validateRequest(MiscEncountersSchema),
  async (
    req: Request<{ userId: string }, {}, CreateMiscEncounterDto>,
    res: Response
  ) => {
    try {
      const encounter = req.body;
      const result = await service.createMiscEncounterTourist(
        encounter,
        Number.parseInt(req.params.userId)
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating misc encounter tourist:", error);
      return res
        .status(500)
        .json({ message: "error while creating misc encounter" });
    }
  }
);

router.post(
  "/createSocialEncounter/author",
  validateRequest(SocialEncounterSchema),
  async (req: Request<{}, {}, CreateSocialEncounterDto>, res: Response) => {
    try {
      const encounter = req.body;
      const result = await service.createSocialEncounterAuthor(encounter);
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating social encounter author:", error);
      return res
        .status(500)
        .json({ message: "error while creating social encounter" });
    }
  }
);

router.post(
  "/createSocialEncounter/tourist/:userId",
  validateRequest(SocialEncounterSchema),
  async (
    req: Request<{ userId: string }, {}, CreateSocialEncounterDto>,
    res: Response
  ) => {
    try {
      const encounter = req.body;
      const result = await service.createSocialEncounterTourist(
        encounter,
        Number.parseInt(req.params.userId)
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating social encounter tourist:", error);
      return res
        .status(500)
        .json({ message: "error while creating social encounter" });
    }
  }
);

router.post(
  "/createHiddenEncounter/tourist/:userId",
  validateRequest(HiddenEncounterSchema),
  async (
    req: Request<{ userId: string }, {}, CreateHiddenEncounterDto>,
    res: Response
  ) => {
    try {
      const encounter = req.body;
      const result = await service.createHiddenEncounterTourist(
        encounter,
        Number.parseInt(req.params.userId)
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating hidden encounter: tourist", error);
      return res
        .status(500)
        .json({ message: "error while creating hidden encounter" });
    }
  }
);

router.post(
  "/createHiddenEncounter/author",
  validateRequest(HiddenEncounterSchema),
  async (req: Request<{}, {}, CreateHiddenEncounterDto>, res: Response) => {
    try {
      const encounter = req.body;
      const result = await service.createHiddenEncounterAuthor(encounter);
      return res.status(200).json(result);
    } catch (error) {
      console.error("error while creating hidden encounter autho:", error);
      return res
        .status(500)
        .json({ message: "error while creating hidden encounter" });
    }
  }
);

router.get("/:hiddenEncounterId", async (req: Request, res: Response) => {
  try {
    const encounter = await service.getById(
      Number.parseInt(req.params.hiddenEncounterId)
    );
    return res.json(encounter);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
});

router.post(
  "/:userId/check-range",
  validateRequest(PositionWithRangeSchema),
  async (
    req: Request<{ userId: string }, {}, PositionWithRangeDto>,
    res: Response
  ) => {
    const userId = Number.parseInt(req.params.userId);
    const result = await service.getAllInRange(req.body);

    if (result.success) return res.json(result.value);

    return res.status(400).json({ message: result.message });
  }
);

export default router;
