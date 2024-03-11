import { Router, Request, Response } from "express";
import UserService from "../service/user.service";
import { container } from "tsyringe";
import {
    CustomRequest,
    authenticateToken,
    generateAccessToken,
    notAuthenticated,
} from "../utils/jwtAuthenticator";
import { omit } from "lodash";

export const userRouter = Router();

const userService = container.resolve(UserService);

userRouter.post("/", notAuthenticated, async (req: Request, res: Response) => {
    const result = await userService.create(req.body);
    if (result.success) {
        res.send({
            token: generateAccessToken(result.value),
            username: result.value,
        });
    } else {
        res.status(400).send(result.message);
    }
});

userRouter.get("/", authenticateToken, (req: Request, res: Response) => {
    const user = userService.getByUsername((req as CustomRequest).username);
    if (!user) {
        res.sendStatus(400);
    }
    res.send(omit(user, ["password", "isDeleted"]));
});
