import "reflect-metadata";
import express, { Request, Response } from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./utils/data-source";

const port = config.get<number>("port");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

import { userRouter } from "./routes/user.routes";

app.use("/api/user", userRouter);

AppDataSource.initialize()
    .then(() => {
        console.log("fiji-boys connected to database");
        app.listen(port, async () => {
            console.log(`Server running at port ${port}`);
        });
    })
    .catch((error) => console.log(error));

app.get("/", async (req: Request, res: Response) => {});
