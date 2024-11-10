// controllers/applicantController.js
const applicantService = require("../services/applicantService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * List applicants with optional vacancy filter
 */
const listApplicants = async (req, res) => {
  const { employerId, userId, status } = req.query;
  try {
    const applicants = await applicantService.getApplicants(
      employerId,
      userId,
      status
    );
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

/**
 * Move applicant to the next step in the recruitment process
 */
const moveToNextStep = async (req, res) => {
  const applicantId = parseInt(req.params.id);
  const { result, summary, flow } = req.body;

  if (isNaN(applicantId)) {
    return res
      .status(400)
      .json(responseFormatter(null, "Invalid applicant ID", 400));
  }

  try {
    // Memindahkan applicant ke tahap berikutnya dan mengupdate status ke IN_PROGRESS
    const recruitmentProcess = await applicantService.moveToNextStep(
      applicantId,
      result,
      summary,
      flow
    );
    return res
      .status(200)
      .json(
        responseFormatter(
          recruitmentProcess,
          "Applicant moved to the next step successfully and status updated"
        )
      );
  } catch (error) {
    return res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  listApplicants,
  applyToVacancy,
  moveToNextStep,
};
