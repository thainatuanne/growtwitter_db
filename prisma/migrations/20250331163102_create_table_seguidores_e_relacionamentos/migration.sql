/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id,tweet_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "replyToId" INTEGER,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "nome" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "seguidores" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "seguidor_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguidores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seguidores_usuario_id_seguidor_id_key" ON "seguidores"("usuario_id", "seguidor_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_usuario_id_tweet_id_key" ON "likes"("usuario_id", "tweet_id");

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
