/*
  Warnings:

  - Added the required column `employerId` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vacancy` ADD COLUMN `employerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Vacancy` ADD CONSTRAINT `Vacancy_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
