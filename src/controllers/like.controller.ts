import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export class LikeController {
    public async listar(req: Request, res: Response): Promise<void> {
        try {
            const service = new LikeService();
            const likes = await service.listarLikes();
            res.status(200).json({
                sucesso: true,
                mensagem: "Lista de likes carregada com sucesso",
                dados: likes,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }
            const likeId = Number(id);
            const service = new LikeService();
            const like = await service.buscarPorId(likeId);
            res.status(200).json({
                sucesso: true,
                mensagem: "Like encontrado com sucesso",
                dados: like,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { tweetId } = req.body;
            const usuarioId = req.userId;
            if (!usuarioId) {
                throw new HTTPError(401, "Usuário não autenticado.");
            }

            const service = new LikeService();
            const novoLike = await service.cadastrar({
                usuarioId,
                tweetId
            });

            res.status(201).json({
                sucesso: true,
                mensagem: "Like criado com sucesso",
                dados: novoLike,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }
            const likeId = Number(id);
            const { usuarioId, tweetId } = req.body;
            const service = new LikeService();
            const likeAtualizado = await service.atualizar({
                id: likeId,
                usuarioId,
                tweetId
            });
            res.status(200).json({
                sucesso: true,
                mensagem: "Like atualizado com sucesso",
                dados: likeAtualizado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async deletar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }

            const likeId = Number(id);
            const service = new LikeService();

            const like = await service.buscarPorId(likeId);
            if (like.usuarioId !== req.userId) {
                throw new HTTPError(403, "Você não tem permissão para excluir este like.");
            }

            const likeDeletado = await service.deletar(likeId);
            res.status(200).json({
                sucesso: true,
                mensagem: "Like excluído com sucesso",
                dados: likeDeletado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}