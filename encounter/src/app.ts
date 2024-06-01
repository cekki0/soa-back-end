import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import encounterRouter from "./routes/encounter.routes";
import { init } from "./utils/tracer";
import { createSpanMiddleware } from "./middleware/createSpan";

init();

const port = process.env.PORT || 8089;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(createSpanMiddleware);

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
