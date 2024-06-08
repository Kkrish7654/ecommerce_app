/*
  Warnings:

  - Added the required column `customer_segment` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "customer_segment" TEXT NOT NULL;
