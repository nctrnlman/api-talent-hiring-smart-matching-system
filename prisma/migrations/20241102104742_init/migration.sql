/*
  Warnings:

  - You are about to drop the column `jobExperience` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `jobExperience`,
    ADD COLUMN `jobExperiences` JSON NULL;
