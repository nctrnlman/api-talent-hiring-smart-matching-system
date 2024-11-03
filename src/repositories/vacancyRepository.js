const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class VacancyRepository {
  async findVacancies() {
    return await prisma.vacancy.findMany({
      include: {
        jobLevel: true, // Include JobLevel
        employmentStatus: true, // Include EmploymentStatus
        softSkills: true, // Include SoftSkills (Assuming a relation exists)
        hardSkills: true, // Include HardSkills (Assuming a relation exists)
        // Add more related models as needed
      },
    });
  }

  async findVacancyById(id) {
    return await prisma.vacancy.findUnique({
      where: { id: Number(id) },
    });
  }

  async createVacancy(vacancyData) {
    try {
      const vacancy = await prisma.vacancy.create({
        data: {
          vacancyName: vacancyData.vacancyName,
          jobPosition: vacancyData.jobPosition,
          jobLevelId: vacancyData.jobLevelId,
          employmentStatusId: vacancyData.employmentStatusId,
          vacancyStatus: vacancyData.vacancyStatus,
          responsibilities: vacancyData.responsibilities,
          gender: vacancyData.gender,
          minAge: vacancyData.minAge,
          maxAge: vacancyData.maxAge,
          minYearExperience: vacancyData.minYearExperience,
          minEducationLevelId: vacancyData.minEducationLevelId,
          employerId: vacancyData.employerId,
          softSkills: {
            connect: vacancyData.softSkills.map((skillId) => ({ id: skillId })),
          },
          hardSkills: {
            connect: vacancyData.hardSkills.map((skillId) => ({ id: skillId })),
          },
        },
      });
      return vacancy;
    } catch (error) {
      console.error("Error creating vacancy:", error);
      throw new Error("An error occurred while creating the vacancy.");
    }
  }

  async updateVacancy(id, vacancyData) {
    try {
      const vacancy = await prisma.vacancy.update({
        where: { id: Number(id) },
        data: {
          vacancyName: vacancyData.vacancyName,
          jobPosition: vacancyData.jobPosition,
          jobLevelId: vacancyData.jobLevelId,
          employmentStatusId: vacancyData.employmentStatusId,
          vacancyStatus: vacancyData.vacancyStatus,
          responsibilities: vacancyData.responsibilities,
          gender: vacancyData.gender,
          minAge: vacancyData.minAge,
          maxAge: vacancyData.maxAge,
          minYearExperience: vacancyData.minYearExperience,
          minEducationLevelId: vacancyData.minEducationLevelId,
          employerId: vacancyData.employerId,
          softSkills: {
            set: vacancyData.softSkills.map((skillId) => ({ id: skillId })),
          },
          hardSkills: {
            set: vacancyData.hardSkills.map((skillId) => ({ id: skillId })),
          },
        },
      });
      return vacancy;
    } catch (error) {
      console.error("Error updating vacancy:", error);
      throw new Error("An error occurred while updating the vacancy.");
    }
  }
}

module.exports = new VacancyRepository();
