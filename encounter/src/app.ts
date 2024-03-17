import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

const port = process.env.PORT || 8089;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

import encounterRouter from "./routes/encounter.routes";

app.use("/api", encounterRouter);

app.listen(port, async () => {
  console.log(`Encounter service running on port ${port}`);
});

app.get("/", async (req: Request, res: Response) => {
  res.send("ez");
});

app.get("/dragan", async (req: Request, res: Response) => {
  res.send("dragoslavlje");
});
