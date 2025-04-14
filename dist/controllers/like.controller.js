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
exports.LikeController = void 0;
const like_service_1 = require("../services/like.service");
const on_error_1 = require("../utils/on-error");
const http_error_1 = require("../utils/http.error");
class LikeController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new like_service_1.LikeService();
                const likes = yield service.listarLikes();
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Lista de likes carregada com sucesso",
                    dados: likes,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    buscarPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    throw new http_error_1.HTTPError(400, "ID inválido.");
                }
                const likeId = Number(id);
                const service = new like_service_1.LikeService();
                const like = yield service.buscarPorId(likeId);
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Like encontrado com sucesso",
                    dados: like,
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
                const { tweetId } = req.body;
                const usuarioId = req.userId;
                if (!usuarioId) {
                    throw new http_error_1.HTTPError(401, "Usuário não autenticado.");
                }
                const service = new like_service_1.LikeService();
                const novoLike = yield service.cadastrar({
                    usuarioId,
                    tweetId
                });
                res.status(201).json({
                    sucesso: true,
                    mensagem: "Like criado com sucesso",
                    dados: novoLike,
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
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    throw new http_error_1.HTTPError(400, "ID inválido.");
                }
                const likeId = Number(id);
                const { usuarioId, tweetId } = req.body;
                const service = new like_service_1.LikeService();
                const likeAtualizado = yield service.atualizar({
                    id: likeId,
                    usuarioId,
                    tweetId
                });
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Like atualizado com sucesso",
                    dados: likeAtualizado,
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
                if (!id || isNaN(Number(id))) {
                    throw new http_error_1.HTTPError(400, "ID inválido.");
                }
                const likeId = Number(id);
                const service = new like_service_1.LikeService();
                const like = yield service.buscarPorId(likeId);
                if (like.usuarioId !== req.userId) {
                    throw new http_error_1.HTTPError(403, "Você não tem permissão para excluir este like.");
                }
                const likeDeletado = yield service.deletar(likeId);
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Like excluído com sucesso",
                    dados: likeDeletado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
}
exports.LikeController = LikeController;
