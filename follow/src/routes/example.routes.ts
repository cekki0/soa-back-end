import { Router, Request, Response } from "express";
import FollowService from "../service/follow.service";
import validateRequest from "../middleware/validateRequest";
import { ExampleSchema, ExampleDto } from "../schema/example.schema";

const router = Router();

const service = new FollowService();

router.get("/", async (req: Request, res: Response) => {
  // const result = await service.getFirst();
  // res.send(result);
});

router.post(
  "/:id",
  validateRequest(ExampleSchema),
  (req: Request<{ id: string }, {}, ExampleDto>, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
