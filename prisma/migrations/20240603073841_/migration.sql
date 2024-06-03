-- CreateTable
CREATE TABLE "AdminToken" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "is_expiration" BOOLEAN NOT NULL DEFAULT false,
    "ip" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER NOT NULL,

    CONSTRAINT "AdminToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminToken" ADD CONSTRAINT "AdminToken_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
