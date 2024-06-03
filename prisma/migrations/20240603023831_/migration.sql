-- CreateEnum
CREATE TYPE "PostState" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('NOTICE', 'FAQ');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('DEFAULT');

-- CreateEnum
CREATE TYPE "PostCommentState" AS ENUM ('ENABLED', 'DISABLED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "loginId" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "nickname" VARCHAR NOT NULL,
    "profile_image_url" VARCHAR,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "is_top" BOOLEAN NOT NULL DEFAULT false,
    "is_secret" BOOLEAN NOT NULL DEFAULT false,
    "is_comment" BOOLEAN NOT NULL DEFAULT false,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR NOT NULL,
    "thumbnail" VARCHAR,
    "content" TEXT NOT NULL,
    "images" VARCHAR[],
    "postType" "PostType" NOT NULL,
    "state" "PostState" NOT NULL DEFAULT 'ENABLED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "admin_id" INTEGER,
    "postCategory" "PostCategory" NOT NULL DEFAULT 'DEFAULT',
    "user_id" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "state" "PostCommentState" NOT NULL DEFAULT 'ENABLED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER,
    "admin_id" INTEGER,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__Join:PostUserLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "__Join:PostUserLikes_AB_unique" ON "__Join:PostUserLikes"("A", "B");

-- CreateIndex
CREATE INDEX "__Join:PostUserLikes_B_index" ON "__Join:PostUserLikes"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__Join:PostUserLikes" ADD CONSTRAINT "__Join:PostUserLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__Join:PostUserLikes" ADD CONSTRAINT "__Join:PostUserLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
