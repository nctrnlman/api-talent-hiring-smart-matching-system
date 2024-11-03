// src/controllers/candidateController.js
const candidateService = require("../services/candidateService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * Function to list all candidates
 */
const listCandidates = async (req, res) => {
  try {
    const candidates = await candidateService.getCandidates();
    res
      .status(200)
      .json(responseFormatter(candidates, "Candidates fetched successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Function to get candidate details by ID
 */
const getCandidateById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await candidateService.getCandidateById(id);
    if (!candidate) {
      return res
        .status(404)
        .json(responseFormatter(null, "Candidate not found", 404));
    }
    res
      .status(200)
      .json(
        responseFormatter(candidate, "Candidate details fetched successfully")
      );
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  listCandidates,
  getCandidateById,
};
