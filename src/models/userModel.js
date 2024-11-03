const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UserModel {
  static async createUser(data) {
    return await prisma.user.create({
      data,
    });
  }

  static async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

module.exports = UserModel;
