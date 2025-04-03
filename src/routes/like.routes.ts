import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class likeRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new LikeController();

        router.use(authMiddleware);

        // rotas protegidas:
        router.get("/", controller.listar);
        router.get("/:id", controller.buscarPorId);
        router.post("/", controller.cadastrar);
        router.put("/:id", controller.atualizar);
        router.delete("/:id", controller.deletar);

        return router;
    }
}
