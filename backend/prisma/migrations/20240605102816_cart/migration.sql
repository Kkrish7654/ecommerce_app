/*
  Warnings:

  - Added the required column `updated_at` to the `stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `user_cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT');

-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL  DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_cart" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "transaction_type" "transaction_type" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
