import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { envs } from "./envs";
import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { likeRoutes } from "./routes/like.routes";
import { seguidorRoutes } from "./routes/seguidor.routes";
import { onError } from "./utils/on-error";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/usuarios", usuarioRoutes.bind());
app.use("/tweets", tweetRoutes.bind());
app.use("/likes", likeRoutes.bind());
app.use("/seguidores", seguidorRoutes.bind());

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    onError(err, res);
});

const PORT = Number(envs.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});