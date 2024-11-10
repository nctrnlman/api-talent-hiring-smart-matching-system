// repositories/applicantRepository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ApplicantRepository {
  // Get all applicants, optionally filtered by vacancyId
  async findApplicants(employerId, userId, status) {
    const query = {
      include: {
        user: {
          include: {
            educationLevel: true, // Menyertakan data dari relasi educationLevel
          },
        },
        vacancy: true, // Include related Vacancy data
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (employerId) {
      query.where = {
        vacancy: {
          employerId: Number(employerId), // Ensure employerId is a number
        },
      };
    }
    if (userId || status) {
      query.where = {
        AND: [
          userId ? { userId: Number(userId) } : undefined, // Ensure userId is a number
          status ? { status: status } : undefined, // Ensure status is applied only when it's provided
        ].filter(Boolean), // Remove undefined values from the array
      };
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

  // Update applicant status and flow
  async updateApplicantStatus(applicantId, status, flow) {
    try {
      // Mencari applicant berdasarkan ID dan memperbarui status dan flow-nya
      const updatedApplicant = await prisma.applicant.update({
        where: { id: applicantId }, // Mencari berdasarkan ID applicant
        data: {
          status: status, // Status yang ingin diupdate
          flow: flow, // Flow yang ingin diupdate
        },
      });
      return updatedApplicant;
    } catch (error) {
      throw new Error(`Failed to update applicant status: ${error.message}`);
    }
  }
}

module.exports = new ApplicantRepository();
