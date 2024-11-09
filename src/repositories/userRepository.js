const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserRepository {
  async create(userData) {
    try {
      const user = await prisma.user.create({
        data: {
          fullname: userData.fullname,
          birthOfDate: userData.birthOfDate
            ? new Date(userData.birthOfDate)
            : null,
          address: userData.address,
          job: userData.job,
          jobExperiences: userData.jobExperiences,
          cv: userData.cv,
          instagram: userData.instagram,
          twitter: userData.twitter,
          linkedin: userData.linkedin,
          portfolio: userData.portfolio,
          photoProfile: userData.photoProfile,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          yearOfExperience: userData.yearOfExperience,
          gender: userData.gender,
          companyName: userData.companyName,
          summary: userData.summary,
          softSkills: userData.softSkills
            ? JSON.parse(userData.softSkills)
            : null, // Parsing JSON if available
          hardSkills: userData.hardSkills
            ? JSON.parse(userData.hardSkills)
            : null, // Parsing JSON if available
          educationLevelId: parseInt(userData.educationLevelId) || null,
        },
      });
      return user;
    } catch (error) {
      if (
        error.code === "P2002" &&
        error.meta &&
        error.meta.target.includes("email")
      ) {
        throw new Error(
          "This email is already registered. Please use a different email."
        );
      }
      console.error("Error creating user:", error);
      throw new Error("An error occurred while creating the user.");
    }
  }

  async findByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error("User not found with the provided email.");
      }
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Could not find user by email.");
    }
  }

  async findCandidates() {
    try {
      const candidates = await prisma.user.findMany({
        where: {
          role: "CANDIDATE",
        },
        select: {
          id: true,
          fullname: true,
          birthOfDate: true,
          address: true,
          job: true,
          jobExperiences: true,
          photoProfile: true,
          phoneNumber: true,
          email: true,
          yearOfExperience: true,
          gender: true,
          companyName: true,
          summary: true,
        },
      });
      return candidates;
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw new Error("An error occurred while fetching candidates.");
    }
  }

  async findCandidateById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id), role: "CANDIDATE" },
    });
  }

  async updateCandidateById(id, candidateData) {
    try {
      const updatedCandidate = await prisma.user.update({
        where: { id: Number(id), role: "CANDIDATE" },
        data: {
          fullname: candidateData.fullname,
          birthOfDate: candidateData.birthOfDate
            ? new Date(candidateData.birthOfDate)
            : null,
          address: candidateData.address,
          job: candidateData.job,
          jobExperiences: candidateData.jobExperiences,
          cv: candidateData.cv,
          instagram: candidateData.instagram,
          twitter: candidateData.twitter,
          linkedin: candidateData.linkedin,
          portfolio: candidateData.portfolio,
          phoneNumber: candidateData.phoneNumber,
          email: candidateData.email,
          yearOfExperience: candidateData.yearOfExperience,
          gender: candidateData.gender,
          companyName: candidateData.companyName,
          summary: candidateData.summary,
          softSkills: candidateData.softSkills || null,
          hardSkills: candidateData.hardSkills || null,
          educationLevelId: parseInt(candidateData.educationLevelId) || null,
        },
      });
      return updatedCandidate;
    } catch (error) {
      console.error("Error updating candidate:", error);
      throw new Error("An error occurred while updating the candidate.");
    }
  }
}

module.exports = new UserRepository();
