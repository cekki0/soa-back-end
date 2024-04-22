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

app.get("/followers/:id", async (req: Request, res: Response) => {
    const result = await service.getUserFollowers(parseInt(req.params.id));
    res.send(result);
});

app.get("/", async (req: Request, res: Response) => {
    res.send("ez");
    const userIds = [
        -170, -172, -171, -168, -169, -3, -178, -174, -176, -177, -8, -175,
        -184,
    ];

    for (const id of userIds) {
        await service.createUser({ id });
    }

    await service.followUser(-172, -169);
    await service.followUser(-171, -169);
    await service.followUser(-168, -169);
    await service.followUser(-169, -168);
    await service.followUser(-169, -170);
    await service.followUser(-3, -178);
    await service.followUser(-3, -174);
    await service.followUser(-3, -176);
    await service.followUser(-3, -177);
    await service.followUser(-3, -8);
    await service.followUser(-3, -169);
    await service.followUser(-3, -175);
    await service.followUser(-3, -184);
    await service.followUser(-178, -3);
    await service.followUser(-174, -3);
    await service.followUser(-176, -3);
    await service.followUser(-177, -3);
    await service.followUser(-8, -3);
    await service.followUser(-169, -3);
});

const service = new FollowService();
