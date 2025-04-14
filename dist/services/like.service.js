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
exports.LikeService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const http_error_1 = require("../utils/http.error");
class LikeService {
    listarLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield prismaClient_1.prismaClient.like.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            username: true,
                        },
                    },
                    tweet: {
                        select: {
                            id: true,
                            conteudo: true,
                        },
                    },
                },
                orderBy: {
                    criadoEm: "desc",
                },
            });
            return likes;
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id) || id <= 0) {
                throw new http_error_1.HTTPError(400, "ID inválido.");
            }
            const like = yield prismaClient_1.prismaClient.like.findUnique({ where: { id } });
            if (!like) {
                throw new http_error_1.HTTPError(404, "Like não encontrado.");
            }
            return like;
        });
    }
    cadastrar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ usuarioId, tweetId }) {
            const likeExistente = yield prismaClient_1.prismaClient.like.findFirst({
                where: {
                    usuarioId,
                    tweetId
                },
            });
            if (likeExistente) {
                throw new http_error_1.HTTPError(409, "Like já existente para este usuário e tweet.");
            }
            const novoLike = yield prismaClient_1.prismaClient.like.create({
                data: {
                    usuarioId,
                    tweetId
                },
            });
            return novoLike;
        });
    }
    atualizar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, usuarioId, tweetId }) {
            yield this.buscarPorId(id);
            const likeAtualizado = yield prismaClient_1.prismaClient.like.update({
                where: { id },
                data: {
                    usuarioId,
                    tweetId
                },
            });
            return likeAtualizado;
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPorId(id);
            const likeDeletado = yield prismaClient_1.prismaClient.like.delete({
                where: { id },
            });
            return likeDeletado;
        });
    }
}
exports.LikeService = LikeService;
