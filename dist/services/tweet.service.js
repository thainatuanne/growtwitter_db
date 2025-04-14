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
exports.TweetService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const http_error_1 = require("../utils/http.error");
class TweetService {
    listarTweets() {
        return __awaiter(this, void 0, void 0, function* () {
            const listarTweets = yield prismaClient_1.prismaClient.tweet.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            username: true,
                        },
                    },
                    replies: true,
                    likes: true,
                },
                orderBy: {
                    criadoEm: "desc",
                },
            });
            return listarTweets;
        });
    }
    listarPorId(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usuarioId || isNaN(usuarioId) || usuarioId <= 0) {
                throw new http_error_1.HTTPError(404, "ID de usuário não encontrado.");
            }
            const listarPorId = yield prismaClient_1.prismaClient.tweet.findMany({
                where: { usuarioId: Number(usuarioId) },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            username: true,
                        },
                    },
                    replies: true,
                    likes: true,
                },
            });
            if (!listarPorId || listarPorId.length === 0) {
                throw new http_error_1.HTTPError(404, `Nenhum tweet encontrado para o usuário com ID ${usuarioId}.`);
            }
            return listarPorId;
        });
    }
    cadastrar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ conteudo, tipo, usuarioId }) {
            const novoTweet = yield prismaClient_1.prismaClient.tweet.create({
                data: {
                    conteudo,
                    tipo,
                    usuarioId,
                },
            });
            return novoTweet;
        });
    }
    atualizar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, conteudo, tipo }) {
            const updateTweet = yield prismaClient_1.prismaClient.tweet.update({
                where: { id },
                data: {
                    conteudo,
                    tipo,
                }
            });
            return updateTweet;
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.listarTweets();
            const deletarTweet = yield prismaClient_1.prismaClient.tweet.delete({
                where: { id },
            });
            return deletarTweet;
        });
    }
}
exports.TweetService = TweetService;
