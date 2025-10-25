/*
  Warnings:

  - A unique constraint covering the columns `[asaasChargeId]` on the table `Charge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asaasChargeId` to the `Charge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charge` ADD COLUMN `asaasChargeId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Charge_asaasChargeId_key` ON `Charge`(`asaasChargeId`);

-- AddForeignKey
ALTER TABLE `Charge` ADD CONSTRAINT `Charge_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
