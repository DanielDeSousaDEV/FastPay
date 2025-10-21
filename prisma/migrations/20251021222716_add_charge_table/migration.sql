-- CreateTable
CREATE TABLE `Charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `paymentType` ENUM('PIX', 'CREDIT_CARD', 'PAYMENT_SLIP') NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `dueDate` DATETIME(3) NULL,
    `installments` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `asaasChargeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Charge_asaasChargeId_key`(`asaasChargeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
