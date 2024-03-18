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

app.use("/example", router);

app.listen(port, async () => {
  logger.info(`Example service running on port ${port}`);
  logger.warn("Warning example.");
  logger.error("Error example.");
  logger.fatal("Fatal example.");
});

app.get("/", async (req: Request, res: Response) => {
  res.send("ez");
});
