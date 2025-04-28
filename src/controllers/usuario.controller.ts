import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

export class UsuarioController {
    public async listar(req: Request, res: Response): Promise<void> {
        try {
            const { completo } = req.query;
            const includeRelations = completo === "true";

            const service = new UsuarioService();
            const usuarios = await service.listarUsuarios(includeRelations);

            res.status(200).json({
                success: true,
                message: "Lista de usuários carregada com sucesso",
                dados: usuarios,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            console.log("Parâmetros recebidos:", req.params);
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }

            const userId = Number(id);
            const service = new UsuarioService();
            const usuario = await service.buscarPorId(userId);

            res.status(200).json({
                success: true,
                message: "Usuário encontrado com sucesso",
                dados: usuario,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const service = new UsuarioService();
            const resultado = await service.cadastrar(req.body);

            res.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }
            const {
                nome,
                email,
                senha,
                username,
                avatar,
            } = req.body;

            const dadosAtualizacao = {
                id: Number(id),
                nome,
                email,
                senha,
                username,
                avatar
            };

            const service = new UsuarioService();
            const resultado = await service.atualizar(dadosAtualizacao);

            res.status(200).json({
                success: true,
                message: "Usuário atualizado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async excluir(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userId = Number(id);

            const service = new UsuarioService();
            const resultado = await service.excluir(userId);

            res.status(200).json({
                success: true,
                message: "Usuário excluído com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    // login
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { emailOuUsername, senha } = req.body;
            if (!emailOuUsername || !senha) {
                throw new HTTPError(400, "emailOuUsername e senha são obrigatórios.");
            }
            const service = new UsuarioService();
            const resultado = await service.login({ emailOuUsername, senha });

            res.status(200).json({
                success: true,
                message: "Login realizado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
