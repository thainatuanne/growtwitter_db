export function getJwtSecret(): string {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não está definida nas variáveis de ambiente");
    }

    return process.env.JWT_SECRET;
}