import { Router, Request, Response } from "express";
import ExampleService from "../service/example.service";
import validateRequest from "../middleware/validateRequest";
import { ExampleSchema, ExampleDto } from "../schema/example.schema";

const router = Router();

const service = new ExampleService();

router.get("/", async (req: Request, res: Response) => {
  const result = await service.getAll();
  res.send(result);
});

router.post(
  "/",
  validateRequest(ExampleSchema),
  (req: Request<{}, {}, ExampleDto>, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
