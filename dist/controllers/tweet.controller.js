"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetController = void 0;
const on_error_1 = require("../utils/on-error");
const tweet_service_1 = require("../services/tweet.service");
class TweetController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new tweet_service_1.TweetService();
                const tweets = yield service.listarTweets();
                res.status(200).json({
                    success: true,
                    message: "Lista de tweets carregada com sucesso",
                    dados: tweets,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    listarPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = Number(id);
                const service = new tweet_service_1.TweetService();
                const tweets = yield service.listarPorId(userId);
                res.status(200).json({
                    success: true,
                    message: "Lista de tweets carregada com sucesso",
                    dados: tweets,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conteudo, tipo } = req.body;
                const usuarioId = req.userId;
                if (!usuarioId) {
                    throw new Error("Usuário não autenticado");
                }
                const service = new tweet_service_1.TweetService();
                const resultado = yield service.cadastrar({
                    conteudo,
                    tipo,
                    usuarioId
                });
                res.status(201).json({
                    success: true,
                    mensagem: "Tweet cadastrado com sucesso",
                    dados: resultado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, conteudo, tipo } = req.body;
                const service = new tweet_service_1.TweetService();
                const updateTweet = yield service.atualizar({
                    id,
                    conteudo,
                    tipo
                });
                res.status(200).json({
                    success: true,
                    mensagem: "Tweet atualizado com sucesso",
                    dados: updateTweet,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tweetId = Number(id);
                const service = new tweet_service_1.TweetService();
                const deletarTweet = yield service.deletar(tweetId);
                res.status(200).json({
                    success: true,
                    mensagem: "Tweet excluído com sucesso",
                    dados: deletarTweet,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
}
exports.TweetController = TweetController;
