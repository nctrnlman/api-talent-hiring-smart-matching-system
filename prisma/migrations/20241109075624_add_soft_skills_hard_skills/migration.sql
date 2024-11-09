/*
  Warnings:

  - You are about to alter the column `gender` on the `Vacancy` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Vacancy` MODIFY `gender` ENUM('male', 'female', 'other') NULL;
