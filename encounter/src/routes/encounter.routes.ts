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
  CreateHiddenEncounterDto
} from "../schema/encounter.schema";
import { touristProgress } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../utils/db-connection";

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
    "/createMiscEncounter/tourist",
    validateRequest(MiscEncountersSchema),
    async (req: Request<{}, {}, CreateMiscEncounterDto>, res: Response) => {
      try {
        const encounter = req.body;
        const result = await service.createMiscEncounterTourist(encounter);
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
    "/createSocialEncounter/tourist",
    validateRequest(SocialEncounterSchema),
    async (req: Request<{}, {}, CreateSocialEncounterDto>, res: Response) => {
      try {
        const encounter = req.body;
        const result = await service.createSocialEncounterTourist(encounter);
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
    "/createHiddenEncounter/tourist",
    validateRequest(SocialEncounterSchema),
    async (req: Request<{}, {}, CreateHiddenEncounterDto>, res: Response) => {
      try {
        const encounter = req.body;
        const result = await service.createHiddenEncounterTourist(encounter);
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
    validateRequest(SocialEncounterSchema),
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





export default router;
