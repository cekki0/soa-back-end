import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

const port = process.env.PORT || 8089;

const app = express();

app.use(express.json());
app.use(cors());

import router from "./routes/example.routes";

app.use("/example", router);

app.listen(port, async () => {
  console.log(`Example service running on port ${port}`);
});

app.get("/", async (req: Request, res: Response) => {
  res.send("ez");
});
