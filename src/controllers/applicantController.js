// controllers/applicantController.js
const applicantService = require("../services/applicantService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * List applicants with optional vacancy filter
 */
const listApplicants = async (req, res) => {
  const { vacancyId } = req.query;
  try {
    const applicants = await applicantService.getApplicants(vacancyId);
    res
      .status(200)
      .json(responseFormatter(applicants, "Applicants fetched successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Apply to a vacancy
 */
const applyToVacancy = async (req, res) => {
  const applicantData = req.body;
  try {
    const applicant = await applicantService.applyForVacancy(applicantData);
    res
      .status(201)
      .json(responseFormatter(applicant, "Application submitted successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  listApplicants,
  applyToVacancy,
};
