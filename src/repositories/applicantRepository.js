// repositories/applicantRepository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ApplicantRepository {
  // Get all applicants, optionally filtered by vacancyId
  async findApplicants(vacancyId) {
    const query = {
      include: {
        user: true,
        vacancy: true, // Include related Vacancy data
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (vacancyId) {
      query.where = { vacancyId: Number(vacancyId) };
    }

    return await prisma.applicant.findMany(query);
  }

  async createApplicant(applicantData) {
    return await prisma.applicant.create({
      data: {
        userId: applicantData.userId,
        vacancyId: applicantData.vacancyId,
        status: applicantData.status,
        flow: applicantData.flow,
        note: applicantData.note,
      },
    });
  }
}

module.exports = new ApplicantRepository();
