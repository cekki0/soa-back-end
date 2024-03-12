import { Router, Request, Response } from "express";
import ExampleService from "../service/example.service";

const router = Router();

const service = new ExampleService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

export default router;
