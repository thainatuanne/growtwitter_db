"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRoutes = void 0;
const express_1 = require("express");
const tweet_controller_1 = require("../controllers/tweet.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class tweetRoutes {
    static bind() {
        const router = (0, express_1.Router)();
        const controller = new tweet_controller_1.TweetController();
        router.use(auth_middleware_1.authMiddleware);
        // rotas protegidas:
        router.get("/", controller.listar);
        router.get("/:id", controller.listarPorId);
        router.post("/", controller.cadastrar);
        router.put("/:id", controller.atualizar);
        router.delete("/:id", controller.deletar);
        return router;
    }
}
exports.tweetRoutes = tweetRoutes;
