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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const prismaClient_1 = require("../database/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = require("../utils/http.error");
const getJwtSecret_1 = require("../middlewares/getJwtSecret");
class UsuarioService {
    // cadastro
    cadastrar(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha, username } = dados;
            // verifica se já existe um usuário com o mesmo e-mail ou username
            const usuarioExistente = yield prismaClient_1.prismaClient.usuario.findFirst({
                where: {
                    OR: [{ email }, { username }],
                },
            });
            if (usuarioExistente) {
                throw new http_error_1.HTTPError(409, "Email ou username já está em uso.");
            }
            const senhaCriptografada = yield bcrypt_1.default.hash(senha, 10);
            const novoUsuario = yield prismaClient_1.prismaClient.usuario.create({
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada,
                    username
                },
            });
            const { senha: _ } = novoUsuario, usuarioSemSenha = __rest(novoUsuario, ["senha"]);
            return usuarioSemSenha;
        });
    }
    // login de usuário
    login(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emailOuUsername, senha } = dados;
            const usuario = yield prismaClient_1.prismaClient.usuario.findFirst({
                where: {
                    OR: [{ email: emailOuUsername }, { username: emailOuUsername }],
                },
            });
            if (!usuario) {
                throw new http_error_1.HTTPError(404, "Usuário não encontrado");
            }
            const senhaValida = yield bcrypt_1.default.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new http_error_1.HTTPError(401, "Senha inválida");
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.id }, (0, getJwtSecret_1.getJwtSecret)(), { expiresIn: "1h" });
            const { senha: _ } = usuario, usuarioSemSenha = __rest(usuario, ["senha"]);
            return { token, usuario: usuarioSemSenha };
        });
    }
    // lista de usuarios
    listarUsuarios() {
        return __awaiter(this, arguments, void 0, function* (includeRelations = false) {
            const usuarios = yield prismaClient_1.prismaClient.usuario.findMany({
                include: includeRelations
                    ? {
                        tweets: {
                            select: {
                                id: true,
                                conteudo: true,
                                criadoEm: true,
                            },
                        },
                        likes: {
                            select: {
                                id: true,
                                tweetId: true,
                                criadoEm: true,
                            },
                        },
                        seguindo: {
                            select: {
                                seguidor: {
                                    select: {
                                        id: true,
                                        nome: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                        seguido: {
                            select: {
                                usuario: {
                                    select: {
                                        id: true,
                                        nome: true,
                                        username: true,
                                    },
                                },
                            },
                        },
                    }
                    : undefined,
            });
            return usuarios.map((_a) => {
                var { senha } = _a, usuarioSemSenha = __rest(_a, ["senha"]);
                return usuarioSemSenha;
            });
        });
    }
    // busca usuario por id
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield prismaClient_1.prismaClient.usuario.findUnique({ where: { id } });
            if (!usuario)
                throw new http_error_1.HTTPError(404, "Usuário não encontrado");
            const { senha } = usuario, resto = __rest(usuario, ["senha"]);
            return resto;
        });
    }
    // atualiza os dados do usuário pelo id
    atualizar(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, email, senha, username } = dados;
            if (!nome && !email && !senha && !username) {
                throw new http_error_1.HTTPError(400, "Nenhum campo enviado para atualização.");
            }
            yield this.buscarPorId(id);
            const senhaCriptografada = senha ? yield bcrypt_1.default.hash(senha, 10) : undefined;
            const usuarioAtualizado = yield prismaClient_1.prismaClient.usuario.update({
                where: { id },
                data: {
                    nome,
                    email,
                    username,
                    senha: senhaCriptografada,
                },
            });
            const { senha: _ } = usuarioAtualizado, resto = __rest(usuarioAtualizado, ["senha"]);
            return resto;
        });
    }
    // exclui um usuário
    excluir(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPorId(id);
            const usuarioExcluido = yield prismaClient_1.prismaClient.usuario.delete({ where: { id } });
            const { senha: _ } = usuarioExcluido, resto = __rest(usuarioExcluido, ["senha"]);
            return resto;
        });
    }
}
exports.UsuarioService = UsuarioService;
