import { TweetType } from "@prisma/client";

export interface cadastrarTweetDTO {
    conteudo: string;
    tipo: TweetType;
    usuarioId: number;
    replyToId?: number;
}

export interface AtualizarTweetDTO {
    id: number;
    conteudo: string;
    tipo: TweetType;
    replyToId?: number;
}