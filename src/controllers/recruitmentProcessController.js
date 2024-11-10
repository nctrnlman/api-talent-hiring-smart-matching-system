// controllers/recruitmentProcessController.js
const recruitmentProcessService = require("../services/recruitmentProcessService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * Get all recruitment processes with optional filters
 */
const getAllRecruitmentProcesses = async (req, res) => {
  const { employerId, flow, userId } = req.query; // Ambil userId dari query parameter
  try {
    const recruitmentProcesses =
      await recruitmentProcessService.getRecruitmentProcesses(
        employerId,
        flow,
        userId
      );
    res
      .status(200)
      .json(
        responseFormatter(
          recruitmentProcesses,
          "Recruitment processes fetched successfully"
        )
      );
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Update the result and summary of a recruitment process
 */
const updateRecruitmentProcessResult = async (req, res) => {
  const { id } = req.params;
  const { result, summary } = req.body;

  if (!result || !summary) {
    return res
      .status(400)
      .json(responseFormatter(null, "Result and summary are required", 400));
  }

  try {
    const updatedProcess = await recruitmentProcessService.updateProcessResult(
      id,
      result,
      summary
    );
    res
      .status(200)
      .json(responseFormatter(updatedProcess, "Updated successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  getAllRecruitmentProcesses,
  updateRecruitmentProcessResult,
};
