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
exports.SeguidorService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const http_error_1 = require("../utils/http.error");
class SeguidorService {
    listarSeguidores() {
        return __awaiter(this, void 0, void 0, function* () {
            const seguidores = yield prismaClient_1.prismaClient.seguidor.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            username: true
                        }
                    },
                    seguidor: {
                        select: {
                            id: true,
                            nome: true,
                            username: true
                        }
                    },
                },
                orderBy: {
                    criadoEm: "desc"
                },
            });
            return seguidores;
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || isNaN(id)) {
                throw new http_error_1.HTTPError(400, "ID inválido.");
            }
            const seguidor = yield prismaClient_1.prismaClient.seguidor.findUnique({
                where: { id }
            });
            if (!seguidor) {
                throw new http_error_1.HTTPError(404, "Seguidor não encontrado.");
            }
            return seguidor;
        });
    }
    cadastrar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ usuarioId, seguidorId }) {
            if (usuarioId === seguidorId) {
                throw new http_error_1.HTTPError(400, "O usuário não pode seguir a si mesmo.");
            }
            const relExistente = yield prismaClient_1.prismaClient.seguidor.findFirst({
                where: {
                    usuarioId,
                    seguidorId
                },
            });
            if (relExistente) {
                throw new http_error_1.HTTPError(409, "Este usuário já está seguindo esse outro usuário.");
            }
            const novoSeguidor = yield prismaClient_1.prismaClient.seguidor.create({
                data: {
                    usuarioId,
                    seguidorId
                },
            });
            return novoSeguidor;
        });
    }
    atualizar(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, usuarioId, seguidorId }) {
            yield this.buscarPorId(id);
            if (usuarioId !== undefined && seguidorId !== undefined && usuarioId === seguidorId) {
                throw new http_error_1.HTTPError(400, "O usuário não pode seguir a si mesmo.");
            }
            const atualizado = yield prismaClient_1.prismaClient.seguidor.update({
                where: { id },
                data: {
                    usuarioId,
                    seguidorId
                },
            });
            return atualizado;
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPorId(id);
            const deletado = yield prismaClient_1.prismaClient.seguidor.delete({
                where: {
                    id
                }
            });
            return deletado;
        });
    }
}
exports.SeguidorService = SeguidorService;
