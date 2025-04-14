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
exports.SeguidorController = void 0;
const seguidor_service_1 = require("../services/seguidor.service");
const on_error_1 = require("../utils/on-error");
const http_error_1 = require("../utils/http.error");
const prismaClient_1 = require("../database/prismaClient");
class SeguidorController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new seguidor_service_1.SeguidorService();
                const seguidores = yield service.listarSeguidores();
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Lista de seguidores carregada com sucesso",
                    dados: seguidores,
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
                const seguidorId = Number(id);
                const service = new seguidor_service_1.SeguidorService();
                const relacao = yield service.buscarPorId(seguidorId);
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Relação de seguidor encontrada com sucesso",
                    dados: relacao,
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
                const seguidorId = req.body.seguidorId;
                const usuarioId = req.userId;
                if (!usuarioId) {
                    throw new http_error_1.HTTPError(401, "Usuário não autenticado.");
                }
                const service = new seguidor_service_1.SeguidorService();
                const novaRelacao = yield service.cadastrar({ usuarioId, seguidorId });
                const usuario = yield prismaClient_1.prismaClient.usuario.findUnique({
                    where: {
                        id: usuarioId
                    }
                });
                const seguido = yield prismaClient_1.prismaClient.usuario.findUnique({
                    where: {
                        id: seguidorId
                    }
                });
                res.status(201).json({
                    sucesso: true,
                    mensagem: `${usuario === null || usuario === void 0 ? void 0 : usuario.nome} passou a seguir ${seguido === null || seguido === void 0 ? void 0 : seguido.nome} com sucesso!`,
                    dados: novaRelacao,
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
                const relacaoId = Number(id);
                const { usuarioId, seguidorId } = req.body;
                const service = new seguidor_service_1.SeguidorService();
                const atualizado = yield service.atualizar({
                    id: relacaoId,
                    usuarioId,
                    seguidorId
                });
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Relação de seguidor atualizada com sucesso",
                    dados: atualizado,
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
                const relacaoId = Number(id);
                const service = new seguidor_service_1.SeguidorService();
                const relacao = yield service.buscarPorId(relacaoId);
                if (relacao.usuarioId !== req.userId) {
                    throw new http_error_1.HTTPError(403, "Você não tem permissão para excluir esta relação.");
                }
                const deletado = yield service.deletar(relacaoId);
                const usuario = yield prismaClient_1.prismaClient.usuario.findUnique({
                    where: {
                        id: deletado.usuarioId
                    }
                });
                const seguido = yield prismaClient_1.prismaClient.usuario.findUnique({
                    where: {
                        id: deletado.seguidorId
                    }
                });
                const nomeUsuario = (usuario === null || usuario === void 0 ? void 0 : usuario.nome) || "Usuário";
                const nomeSeguidor = (seguido === null || seguido === void 0 ? void 0 : seguido.nome) || "Seguidor";
                res.status(200).json({
                    sucesso: true,
                    mensagem: `${nomeUsuario} deixou de seguir ${nomeSeguidor} com sucesso.`,
                    dados: deletado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
}
exports.SeguidorController = SeguidorController;
