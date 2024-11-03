/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `birthOfDate` DATETIME(3) NULL,
    ADD COLUMN `cv` VARCHAR(191) NULL,
    ADD COLUMN `fullname` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `job` VARCHAR(191) NULL,
    ADD COLUMN `jobExperience` JSON NULL,
    ADD COLUMN `linkedin` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `photoProfile` VARCHAR(191) NULL,
    ADD COLUMN `portfolio` VARCHAR(191) NULL,
    ADD COLUMN `twitter` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
