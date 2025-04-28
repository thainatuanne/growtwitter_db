export interface CreateUsuarioDTO {
    nome: string;
    email: string;
    senha: string;
    username: string;
    avatar?: string;
}

export interface UpdateUsuarioDTO {
    id: number;
    nome?: string;
    email?: string;
    senha?: string;
    username?: string;
    avatar?: string;
}

export interface LoginUsuarioDTO {
    emailOuUsername: string;
    senha: string;
}
