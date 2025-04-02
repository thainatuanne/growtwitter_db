/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tweet";

-- CreateTable
CREATE TABLE "tweets" (
    "id" SERIAL NOT NULL,
    "conteudo" VARCHAR(280) NOT NULL,
    "tipo" "TweetType" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tweet_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);
