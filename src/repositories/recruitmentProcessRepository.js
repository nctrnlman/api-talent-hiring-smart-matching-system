// repositories/recruitmentProcessRepository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RecruitmentProcessRepository {
  // Fungsi untuk membuat data baru di tabel RecruitmentProcess
  async createRecruitmentProcess(data) {
    return await prisma.recruitmentProcess.create({
      data: {
        applicantId: data.applicantId,
        result: data.result, // Menyimpan hasil proses
        summary: data.summary, // Ringkasan proses
        flow: data.flow, // Alur proses
        createdAt: new Date(), // Tanggal mulai proses
      },
    });
  }

  // Fungsi untuk memperbarui status applicant ke IN_PROGRESS
  async updateApplicantStatusToInProgress(applicantId) {
    return await prisma.applicant.update({
      where: { id: applicantId },
      data: { status: "IN_PROGRESS" },
    });
  }

  async getRecruitmentProcesses(employerId, flow, userId) {
    try {
      // Membangun query dasar
      const query = {
        include: {
          applicant: {
            include: {
              vacancy: {
                include: {
                  employer: true, // Sertakan data employer dari tabel vacancy
                  minEducationLevel: true, // Sertakan data educationLevel dari vacancy
                },
              },
              user: {
                include: {
                  educationLevel: true, // Sertakan data educationLevel dari user
                },
              }, // Sertakan data user yang berelasi dengan applicant
            },
          },
        },
        orderBy: {
          createdAt: "desc", // Urutkan berdasarkan tanggal pembuatan
        },
      };

      // Filter berdasarkan employerId jika disediakan
      if (employerId) {
        query.where = {
          applicant: {
            vacancy: {
              employerId: Number(employerId), // Pastikan employerId adalah angka
            },
          },
        };
      }

      // Filter berdasarkan flow jika disediakan
      if (flow) {
        query.where = {
          ...query.where,
          flow: flow, // Filter berdasarkan flow
        };
      }

      // Filter berdasarkan userId jika disediakan
      if (userId) {
        query.where = {
          ...query.where,
          applicant: {
            userId: Number(userId), // Pastikan userId adalah angka
          },
        };
      }

      // Mengambil data recruitment process beserta applicant, vacancy, dan user
      const recruitmentProcesses = await prisma.recruitmentProcess.findMany(
        query
      );
      return recruitmentProcesses;
    } catch (error) {
      throw new Error(`Failed to get recruitment processes: ${error.message}`);
    }
  }

  async updateProcessResult(id, result, summary) {
    try {
      return await prisma.recruitmentProcess.update({
        where: { id: Number(id) },
        data: { result, summary },
        include: {
          applicant: true, // Include the related applicant data
        },
      });
    } catch (error) {
      throw new Error(`Failed to update recruitment process: ${error.message}`);
    }
  }

  async updateApplicantStatus(applicantId, status) {
    try {
      return await prisma.applicant.update({
        where: { id: applicantId },
        data: { status },
      });
    } catch (error) {
      throw new Error(`Failed to update applicant status: ${error.message}`);
    }
  }
}

module.exports = new RecruitmentProcessRepository();
