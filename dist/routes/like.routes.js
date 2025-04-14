"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = require("express");
const like_controller_1 = require("../controllers/like.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class likeRoutes {
    static bind() {
        const router = (0, express_1.Router)();
        const controller = new like_controller_1.LikeController();
        router.use(auth_middleware_1.authMiddleware);
        // rotas protegidas:
        router.get("/", controller.listar);
        router.get("/:id", controller.buscarPorId);
        router.post("/", controller.cadastrar);
        router.put("/:id", controller.atualizar);
        router.delete("/:id", controller.deletar);
        return router;
    }
}
exports.likeRoutes = likeRoutes;
