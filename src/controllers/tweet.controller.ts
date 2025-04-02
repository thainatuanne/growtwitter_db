import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { TweetService } from "../services/tweet.service";

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

    public async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const { conteudo, tipo, usuarioId } = req.body;
            const service = new TweetService();

            const resultado = await service.cadastrar({ conteudo, tipo, usuarioId });

            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet cadastrado com sucesso",
                dados: resultado,
            })

        } catch (error) {
            onError(error, res);
        }
    }

    public async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id, conteudo, tipo } = req.body;
            const service = new TweetService();

            const updateTweet = await service.atualizar({ id, conteudo, tipo });

            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet atualizado com sucesso",
                dados: updateTweet,
            })

        } catch (error) {
            onError(error, res);

        }
    }

    public async deletar(req: Request, res: Response): Promise<void> {
        try {
            // input
            const { id } = req.params;
            const tweetId = Number(id);
            const service = new TweetService();

            const deletarTweet = await service.deletar(tweetId);

            res.status(201).json({
                sucesso: true,
                mensagem: "Tweet excluído com sucesso",
                dados: deletarTweet
            })

        } catch (error) {
            onError(error, res);
        }
    }
}