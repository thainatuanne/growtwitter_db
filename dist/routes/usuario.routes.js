"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = void 0;
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class usuarioRoutes {
    static bind() {
        const router = (0, express_1.Router)();
        const controller = new usuario_controller_1.UsuarioController();
        // rotas públicas (já estão sob o prefixo /usuarios)
        router.get("/", controller.listar);
        router.get("/:id", controller.buscarPorId);
        router.post("/", controller.cadastrar);
        router.post("/login", controller.login);
        // rotas protegidas
        router.put("/:id", auth_middleware_1.authMiddleware, controller.atualizar);
        router.delete("/:id", auth_middleware_1.authMiddleware, controller.excluir);
        return router;
    }
}
exports.usuarioRoutes = usuarioRoutes;
