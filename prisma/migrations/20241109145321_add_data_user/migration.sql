-- AlterTable
ALTER TABLE `User` ADD COLUMN `educationLevelId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_UserSoftSkills` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserSoftSkills_AB_unique`(`A`, `B`),
    INDEX `_UserSoftSkills_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserHardSkills` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserHardSkills_AB_unique`(`A`, `B`),
    INDEX `_UserHardSkills_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_educationLevelId_fkey` FOREIGN KEY (`educationLevelId`) REFERENCES `EducationLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserSoftSkills` ADD CONSTRAINT `_UserSoftSkills_A_fkey` FOREIGN KEY (`A`) REFERENCES `SoftSkill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserSoftSkills` ADD CONSTRAINT `_UserSoftSkills_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserHardSkills` ADD CONSTRAINT `_UserHardSkills_A_fkey` FOREIGN KEY (`A`) REFERENCES `HardSkill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserHardSkills` ADD CONSTRAINT `_UserHardSkills_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
