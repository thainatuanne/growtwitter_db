import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { TweetService } from "../services/tweet.service";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export class TweetController {
    public async listar(req: Request, res: Response): Promise<void> {
        try {
            const service = new TweetService();
            const tweets = await service.listarTweets();

            res.status(200).json({
                success: true,
                message: "Lista de tweets carregada com sucesso",
                dados: tweets,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async listarPorId(req: Request, res: Response): Promise<void> {
        try {
            const { usuarioId } = req.params;
            const userId = Number(usuarioId);
            const service = new TweetService();
            const tweets = await service.listarPorId(userId);

            res.status(200).json({
                success: true,
                message: "Lista de tweets carregada com sucesso",
                dados: tweets,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { conteudo, tipo } = req.body;
            const usuarioId = req.userId;

            if (!usuarioId) {
                throw new Error("Usuário não autenticado");
            }

            const service = new TweetService();
            const resultado = await service.cadastrar({
                conteudo,
                tipo,
                usuarioId
            });

            res.status(201).json({
                success: true,
                mensagem: "Tweet cadastrado com sucesso",
                dados: resultado,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id, conteudo, tipo } = req.body;
            const service = new TweetService();
            const updateTweet = await service.atualizar({
                id,
                conteudo,
                tipo
            });

            res.status(200).json({
                success: true,
                mensagem: "Tweet atualizado com sucesso",
                dados: updateTweet,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async deletar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const tweetId = Number(id);
            const service = new TweetService();

            const deletarTweet = await service.deletar(tweetId);

            res.status(200).json({
                success: true,
                mensagem: "Tweet excluído com sucesso",
                dados: deletarTweet,
            });

        } catch (error) {
            onError(error, res);
        }
    }
}
