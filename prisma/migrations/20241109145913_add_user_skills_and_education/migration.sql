/*
  Warnings:

  - You are about to drop the `_UserHardSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSoftSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserHardSkills` DROP FOREIGN KEY `_UserHardSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserHardSkills` DROP FOREIGN KEY `_UserHardSkills_B_fkey`;

-- DropForeignKey
ALTER TABLE `_UserSoftSkills` DROP FOREIGN KEY `_UserSoftSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserSoftSkills` DROP FOREIGN KEY `_UserSoftSkills_B_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hardSkills` JSON NULL,
    ADD COLUMN `softSkills` JSON NULL;

-- DropTable
DROP TABLE `_UserHardSkills`;

-- DropTable
DROP TABLE `_UserSoftSkills`;
