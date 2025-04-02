import { Router } from "express";
import { SeguidorController } from "../controllers/seguidor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class seguidorRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new SeguidorController();

        router.use(authMiddleware);

        // rotas protegidas
        router.get("/seguidores", controller.listar);
        router.get("/seguidores/:id", controller.buscarPorId);
        router.post("/seguidores", controller.cadastrar);
        router.put("/seguidores/:id", controller.atualizar);
        router.delete("/seguidores/:id", controller.deletar);

        return router;
    }
}
