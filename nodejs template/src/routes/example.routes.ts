import { Router, Request, Response } from "express";
import ExampleService from "../service/example.service";
import validateRequest from "../middleware/validateRequest";
import { exampleSchema, exampleType } from "../schema/example.schema";

const router = Router();

const service = new ExampleService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

router.post(
  "/",
  validateRequest(exampleSchema),
  (req: Request<{}, {}, exampleType["body"]>, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
