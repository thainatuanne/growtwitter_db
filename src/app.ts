import express from "express";
import { usuarioRoutes } from "./routes/usuario.routes";

export const app = express();
app.use(express.json());

app.use(usuarioRoutes.bind());
