-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `asaasCustomerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_document_key`(`document`),
    UNIQUE INDEX `Customer_asaasCustomerId_key`(`asaasCustomerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `paymentType` ENUM('PIX', 'CREDIT_CARD', 'BOLETO') NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `dueDate` DATETIME(3) NOT NULL,
    `installments` INTEGER NULL,
    `asaasInstallmentId` VARCHAR(191) NULL,
    `invoiceUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `asaasChargeId` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `Charge_asaasChargeId_key`(`asaasChargeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Charge` ADD CONSTRAINT `Charge_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
