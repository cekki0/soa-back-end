import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));

const port = process.env.PORT || 8089;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

import router from "./routes/example.routes";
import logger from "./utils/logger";
import FollowService from "./service/follow.service";

app.use("/example", router);

app.listen(port, async () => {
  logger.info(`Example service running on port ${port}`);
});

app.get("/", async (req: Request, res: Response) => {
  res.send("ez");
  await service.createUser({ id: 1, username: "Sima" });
  await service.createUser({ id: 2, username: "Ce" });
  await service.createUser({ id: 3, username: "Drazen" });
  await service.createUser({ id: 4, username: "Krle" });

  await service.followUser(1, 2);
  await service.followUser(1, 3);
  await service.followUser(1, 4);
  await service.followUser(2, 1);
  await service.followUser(3, 1);
  await service.followUser(4, 1);
  await service.followUser(2, 3);

  // log svih siminih followera
  let simaFollowers = await service.getUserFollowers(1);
  console.log("Sima followers:", simaFollowers);

  // log svih siminih followera nakon sto ga ce unfollow
  await service.unfollowUser(2, 1);
  simaFollowers = await service.getUserFollowers(1);
  console.log("Sima followers after unfollow:", simaFollowers);

  let followedBySima = await service.getUsersFollowedByUser(1);
  console.log("Followed by Sima:", followedBySima);

  await service.unfollowUser(1, 2);
  await service.unfollowUser(1, 3);
  followedBySima = await service.getUsersFollowedByUser(1);
  console.log("Followed by Sima after unfollowing:", followedBySima);
});

const service = new FollowService();
