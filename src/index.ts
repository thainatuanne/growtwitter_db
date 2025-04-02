import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { onError } from "./utils/on-error";

const app = express();

app.use(express.json());
app.use(cors());

app.use(usuarioRoutes.bind());
app.use(tweetRoutes.bind());

app.use(onError);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;