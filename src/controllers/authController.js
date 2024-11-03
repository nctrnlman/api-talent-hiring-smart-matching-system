const AuthService = require("../services/authService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * Fungsi untuk register pengguna
 */
const register = async (req, res) => {
  try {
    const {
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
      summary, // New field
    } = req.body;

    const newUser = await AuthService.register(
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
      yearOfExperience, // Pass new field
      gender, // Pass new field
      companyName, // Pass new field
      summary // Pass new field
    );

    res
      .status(201)
      .json(responseFormatter(newUser, "User registered successfully"));
  } catch (error) {
    res.status(400).json(responseFormatter(null, error.message, 400));
  }
};

/**
 * Fungsi untuk login pengguna
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Mengambil email dan password dari body
    const { token, role, userData } = await AuthService.login(email, password);
    res
      .status(200)
      .json(
        responseFormatter(
          { token, role, userData },
          "User logged in successfully"
        )
      );
  } catch (error) {
    res.status(401).json(responseFormatter(null, error.message, 401)); // Mengembalikan pesan kesalahan
  }
};

module.exports = {
  register,
  login,
};
