const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

class AuthService {
  async register(
    fullname,
    birthOfDate,
    address,
    job,
    jobExperiences,
    cv,
    instagram,
    twitter,
    linkedin,
    portfolio,
    photoProfile,
    phoneNumber,
    email,
    password,
    role,
    yearOfExperience, // New field
    gender, // New field
    companyName, // New field
    summary // New field
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepository.create({
      fullname,
      birthOfDate: role === "CANDIDATE" ? birthOfDate : null,
      address: role === "CANDIDATE" ? address : null,
      job: role === "CANDIDATE" ? job : null,
      jobExperiences: role === "CANDIDATE" ? jobExperiences : null,
      cv: role === "CANDIDATE" ? cv : null,
      instagram: role === "CANDIDATE" ? instagram : null,
      twitter: role === "CANDIDATE" ? twitter : null,
      linkedin: role === "CANDIDATE" ? linkedin : null,
      portfolio: role === "CANDIDATE" ? portfolio : null,
      photoProfile: role === "CANDIDATE" ? photoProfile : null,
      phoneNumber,
      email,
      password: hashedPassword,
      role,
      yearOfExperience, // Include new field
      gender, // Include new field
      companyName, // Include new field
      summary, // Include new field
    });
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Email atau password salah");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Email atau password salah");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      role: user.role,
      userData: {
        id: user.id,
        email: user.email,
        name: user.fullname,
        companyName: user.companyName,
      },
    };
  }
}

module.exports = new AuthService();
