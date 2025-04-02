import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class likeRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new LikeController();

        router.use(authMiddleware);

        // rotas protegidas:
        router.get("/likes", controller.listar);
        router.get("/likes/:id", controller.buscarPorId);
        router.post("/likes", controller.cadastrar);
        router.put("/likes/:id", controller.atualizar);
        router.delete("/likes/:id", controller.deletar);

        return router;
    }
}
