const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MasterDataRepository {
  async findJobLevels() {
    return await prisma.jobLevel.findMany();
  }

  async findEmploymentStatuses() {
    return await prisma.employmentStatus.findMany();
  }

  async findSoftSkills() {
    return await prisma.softSkill.findMany();
  }

  async findHardSkills() {
    return await prisma.hardSkill.findMany();
  }

  async findEducLevels() {
    return await prisma.educationLevel.findMany();
  }
}

module.exports = new MasterDataRepository();
