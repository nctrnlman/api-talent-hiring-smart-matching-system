const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class VacancyRepository {
  async findVacancies() {
    return await prisma.vacancy.findMany({
      include: {
        jobLevel: true, // Include JobLevel
        employmentStatus: true, // Include EmploymentStatus
      },
    });
  }

  async findVacancyById(id) {
    // Ambil Vacancy termasuk softSkills dan hardSkills sebagai array ID JSON
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: Number(id) },
      include: {
        jobLevel: true, // Menyertakan data JobLevel terkait
        employmentStatus: true, // Menyertakan data EmploymentStatus terkait
        minEducationLevel: true, // Menyertakan data EducationLevel terkait
        employer: true, // Menyertakan data Employer terkait
      },
    });

    // Jika Vacancy tidak ditemukan, return null
    if (!vacancy) return null;

    // Cek dan parsing JSON string menjadi array
    const softSkills =
      vacancy.softSkills && typeof vacancy.softSkills === "string"
        ? JSON.parse(vacancy.softSkills).map((skill) => parseInt(skill))
        : []; // Parse dan konversi ke integer

    const hardSkills =
      vacancy.hardSkills && typeof vacancy.hardSkills === "string"
        ? JSON.parse(vacancy.hardSkills).map((skill) => parseInt(skill))
        : []; // Parse dan konversi ke integer

    // Ambil SoftSkills dan HardSkills berdasarkan ID yang sudah diparse menjadi array
    const softSkillsData = await prisma.softSkill.findMany({
      where: {
        id: {
          in: softSkills || [], // Mengambil berdasarkan array ID di softSkills
        },
      },
    });

    const hardSkillsData = await prisma.hardSkill.findMany({
      where: {
        id: {
          in: hardSkills || [], // Mengambil berdasarkan array ID di hardSkills
        },
      },
    });

    // Gabungkan data Vacancy dengan SoftSkills dan HardSkills
    return {
      ...vacancy,
      softSkills: softSkillsData,
      hardSkills: hardSkillsData,
    };
  }

  async createVacancy(vacancyData) {
    try {
      const vacancy = await prisma.vacancy.create({
        data: {
          vacancyName: vacancyData.vacancyName,
          jobPosition: vacancyData.jobPosition,
          jobLevelId: parseInt(vacancyData.jobLevelId),
          employmentStatusId: parseInt(vacancyData.employmentStatusId),
          vacancyStatus: vacancyData.vacancyStatus,
          responsibilities: vacancyData.responsibilities,
          gender: vacancyData.gender,
          minAge: vacancyData.minAge,
          maxAge: vacancyData.maxAge,
          minYearExperience: vacancyData.minYearExperience,
          minEducationLevelId: parseInt(vacancyData.minEducationLevelId),
          employerId: parseInt(vacancyData.employerId),
          softSkills: vacancyData.softSkills
            ? JSON.stringify(vacancyData.softSkills)
            : null, // Menggunakan JSON.stringify jika ada
          hardSkills: vacancyData.hardSkills
            ? JSON.stringify(vacancyData.hardSkills)
            : null, // Menggunakan JSON.stringify jika ada
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
          jobLevelId: parseInt(vacancyData.jobLevelId),
          employmentStatusId: parseInt(vacancyData.employmentStatusId),
          vacancyStatus: vacancyData.vacancyStatus,
          responsibilities: vacancyData.responsibilities,
          gender: vacancyData.gender,
          minAge: vacancyData.minAge,
          maxAge: vacancyData.maxAge,
          minYearExperience: vacancyData.minYearExperience,
          minEducationLevelId: parseInt(vacancyData.minEducationLevelId),
          employerId: parseInt(vacancyData.employerId),
          softSkills: vacancyData.softSkills
            ? JSON.stringify(vacancyData.softSkills)
            : null, // Menggunakan JSON.stringify jika ada
          hardSkills: vacancyData.hardSkills
            ? JSON.stringify(vacancyData.hardSkills)
            : null, // Menggunakan JSON.stringify jika ada
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
