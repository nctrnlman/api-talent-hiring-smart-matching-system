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
}

module.exports = new UserRepository();
