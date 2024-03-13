import { Router, Request, Response } from "express";
import EncounterService from "../service/encounter.service";

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

router.post('/', async (req, res) => {
    try {
        const encounter = req.body;
        const result = await service.create(encounter);
        return res.status(200).json(result);
    } catch (error) {
        console.error('error while creating encounter:', error);
        return res.status(500).json({ message: 'error while creating encounter' });
    }
});



export default router;
