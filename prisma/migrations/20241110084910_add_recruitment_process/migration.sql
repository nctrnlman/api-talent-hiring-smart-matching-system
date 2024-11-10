-- CreateTable
CREATE TABLE `RecruitmentProcess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicantId` INTEGER NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `flow` ENUM('SCREENING', 'INTERVIEW', 'OFFER', 'ONBOARDING') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `RecruitmentProcess_applicantId_idx`(`applicantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecruitmentProcess` ADD CONSTRAINT `RecruitmentProcess_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
