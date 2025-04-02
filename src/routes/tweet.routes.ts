import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';

export class tweetRoutes {
    public static bind(): Router {

        const router = Router();

        const controller = new TweetController();

        router.get("/tweets", controller.listar);
        router.get("/tweets/:id", controller.listarPorId);
        router.post("/tweets", controller.cadastrar);
        router.put("/tweets/:id", controller.atualizar);
        router.delete("/tweets/:id", controller.deletar);

        return router;

    }
}