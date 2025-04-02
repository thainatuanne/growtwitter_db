import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class usuarioRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new UsuarioController();

        // rotas públicas
        router.get("/usuarios", controller.listar);
        router.get("/usuarios/:id", controller.buscarPorId);
        router.post("/usuarios", controller.cadastrar);
        router.post("/login", controller.login);

        // rotas protegidas
        router.put("/usuarios/:id", authMiddleware, controller.atualizar);
        router.delete("/usuarios/:id", authMiddleware, controller.excluir);

        return router;
    }
}