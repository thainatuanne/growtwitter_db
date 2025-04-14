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
exports.UsuarioController = void 0;
const usuario_service_1 = require("../services/usuario.service");
const on_error_1 = require("../utils/on-error");
const http_error_1 = require("../utils/http.error");
class UsuarioController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { completo } = req.query;
                const includeRelations = completo === "true";
                const service = new usuario_service_1.UsuarioService();
                const usuarios = yield service.listarUsuarios(includeRelations);
                res.status(200).json({
                    success: true,
                    message: "Lista de usuários carregada com sucesso",
                    dados: usuarios,
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
                console.log("Parâmetros recebidos:", req.params);
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    throw new http_error_1.HTTPError(400, "ID inválido.");
                }
                const userId = Number(id);
                const service = new usuario_service_1.UsuarioService();
                const usuario = yield service.buscarPorId(userId);
                res.status(200).json({
                    success: true,
                    message: "Usuário encontrado com sucesso",
                    dados: usuario,
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
                const service = new usuario_service_1.UsuarioService();
                const resultado = yield service.cadastrar(req.body);
                res.status(201).json({
                    success: true,
                    message: "Usuário cadastrado com sucesso",
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
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    throw new http_error_1.HTTPError(400, "ID inválido.");
                }
                const { nome, email, senha, username } = req.body;
                const dadosAtualizacao = {
                    id: Number(id),
                    nome,
                    email,
                    senha,
                    username,
                };
                const service = new usuario_service_1.UsuarioService();
                const resultado = yield service.atualizar(dadosAtualizacao);
                res.status(200).json({
                    success: true,
                    message: "Usuário atualizado com sucesso",
                    dados: resultado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    excluir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = Number(id);
                const service = new usuario_service_1.UsuarioService();
                const resultado = yield service.excluir(userId);
                res.status(200).json({
                    success: true,
                    message: "Usuário excluído com sucesso",
                    dados: resultado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
    // login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailOuUsername, senha } = req.body;
                if (!emailOuUsername || !senha) {
                    throw new http_error_1.HTTPError(400, "emailOuUsername e senha são obrigatórios.");
                }
                const service = new usuario_service_1.UsuarioService();
                const resultado = yield service.login({ emailOuUsername, senha });
                res.status(200).json({
                    success: true,
                    message: "Login realizado com sucesso",
                    dados: resultado,
                });
            }
            catch (error) {
                (0, on_error_1.onError)(error, res);
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
