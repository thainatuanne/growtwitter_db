import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

export class usuarioRoutes {
    public static bind(): Router {
        const router = Router();
        const controller = new UsuarioController();

        router.get("/usuarios", controller.listar);
        router.get("/usuarios/:id", controller.buscarPorId);
        router.post("/usuarios", controller.cadastrar);
        router.put("/usuarios/:id", controller.atualizar);
        router.delete("/usuarios/:id", controller.excluir);
        router.post("/login", controller.login);

        return router;
    }
}
