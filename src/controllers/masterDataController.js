const masterDataService = require("../services/masterDataService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * Function to get master data based on query parameters
 */
const getMasterData = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res
      .status(400)
      .json(responseFormatter(null, "Type parameter is required.", 400));
  }

  const types = type.split(",").map((t) => t.trim());
  const responseData = {};

  try {
    if (types.includes("jobLevels")) {
      responseData.jobLevels = await masterDataService.getJobLevels();
    }
    if (types.includes("employmentStatuses")) {
      responseData.employmentStatuses =
        await masterDataService.getEmploymentStatuses();
    }
    if (types.includes("softSkills")) {
      responseData.softSkills = await masterDataService.getSoftSkills();
    }
    if (types.includes("hardSkills")) {
      responseData.hardSkills = await masterDataService.getHardSkills();
    }
    if (types.includes("educLevels")) {
      responseData.eduLevels = await masterDataService.getEducLevels();
    }

    res
      .status(200)
      .json(
        responseFormatter(responseData, "Master data retrieved successfully.")
      );
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  getMasterData,
};
