"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const usuario_routes_1 = require("./routes/usuario.routes");
const tweet_routes_1 = require("./routes/tweet.routes");
const like_routes_1 = require("./routes/like.routes");
const seguidor_routes_1 = require("./routes/seguidor.routes");
const on_error_1 = require("./utils/on-error");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/usuarios", usuario_routes_1.usuarioRoutes.bind());
app.use("/tweets", tweet_routes_1.tweetRoutes.bind());
app.use("/likes", like_routes_1.likeRoutes.bind());
app.use("/seguidores", seguidor_routes_1.seguidorRoutes.bind());
// teste raiz
app.get("/", (req, res) => {
    res.send("GrowTwitter API está rodando! 🚀");
});
app.use((err, req, res, next) => {
    (0, on_error_1.onError)(err, res);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
