import { Request, Response } from "express";
import { SeguidorService } from "../services/seguidor.service";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export class SeguidorController {
    public async listar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const service = new SeguidorService();
            const seguidores = await service.listarSeguidores();
            res.status(200).json({
                sucesso: true,
                mensagem: "Lista de seguidores carregada com sucesso",
                dados: seguidores,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async buscarPorId(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new HTTPError(400, "ID inválido.");
            }
            const seguidorId = Number(id);
            const service = new SeguidorService();
            const relacao = await service.buscarPorId(seguidorId);
            res.status(200).json({
                sucesso: true,
                mensagem: "Relação de seguidor encontrada com sucesso",
                dados: relacao,
            });
        } catch (error) {
            onError(error, res);
        }
    }

    public async cadastrar(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const seguidorId = req.body.seguidorId;
            const usuarioId = req.userId;
            if (!usuarioId) {
                throw new HTTPError(401, "Usuário não autenticado.");
            }
            const service = new SeguidorService();
            const novaRelacao = await service.cadastrar({ usuarioId, seguidorId });
            res.status(201).json({
                sucesso: true,
                mensagem: "Usuário passou a seguir com sucesso",
                dados: novaRelacao,
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
            const relacaoId = Number(id);
            const { usuarioId, seguidorId } = req.body;
            const service = new SeguidorService();
            const atualizado = await service.atualizar({
                id: relacaoId,
                usuarioId,
                seguidorId
            });
            res.status(200).json({
                sucesso: true,
                mensagem: "Relação de seguidor atualizada com sucesso",
                dados: atualizado,
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
            const relacaoId = Number(id);
            const service = new SeguidorService();
            const deletado = await service.deletar(relacaoId);
            res.status(200).json({
                sucesso: true,
                mensagem: "Relação de seguidor excluída com sucesso",
                dados: deletado,
            });
        } catch (error) {
            onError(error, res);
        }
    }
}
