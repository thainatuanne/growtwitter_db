import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class usuarioRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new UsuarioController();

        // rotas públicas (já estão sob o prefixo /usuarios)
        router.get("/", controller.listar);
        router.get("/:id", controller.buscarPorId);
        router.post("/", controller.cadastrar);
        router.post("/login", controller.login);

        // rotas protegidas
        router.put("/:id", authMiddleware, controller.atualizar);
        router.delete("/:id", authMiddleware, controller.excluir);

        return router;
    }
}
