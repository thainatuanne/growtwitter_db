"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onError = onError;
const http_error_1 = require("./http.error");
function onError(error, res) {
    if (error instanceof http_error_1.HTTPError) {
        res.status(error.statusCode).json({
            sucesso: false,
            mensagem: error.message,
        });
        return;
    }
    res.status(500).json({
        sucesso: false,
        mensagem: "Ocorreu um erro inesperado.",
        detalhe: error.message,
    });
}
