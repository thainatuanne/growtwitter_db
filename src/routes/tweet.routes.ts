import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class tweetRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new TweetController();

        router.use(authMiddleware);

        // rotas protegidas:
        router.get("/", controller.listar);
        router.get("/:id", controller.listarPorId);
        router.post("/", controller.cadastrar);
        router.put("/:id", controller.atualizar);
        router.delete("/:id", controller.deletar);

        return router;
    }
}