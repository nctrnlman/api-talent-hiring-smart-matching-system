/*
  Warnings:

  - You are about to drop the `_VacancyHardSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VacancySoftSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_VacancyHardSkills` DROP FOREIGN KEY `_VacancyHardSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_VacancyHardSkills` DROP FOREIGN KEY `_VacancyHardSkills_B_fkey`;

-- DropForeignKey
ALTER TABLE `_VacancySoftSkills` DROP FOREIGN KEY `_VacancySoftSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_VacancySoftSkills` DROP FOREIGN KEY `_VacancySoftSkills_B_fkey`;

-- AlterTable
ALTER TABLE `Vacancy` ADD COLUMN `hardSkills` JSON NULL,
    ADD COLUMN `softSkills` JSON NULL;

-- DropTable
DROP TABLE `_VacancyHardSkills`;

-- DropTable
DROP TABLE `_VacancySoftSkills`;
