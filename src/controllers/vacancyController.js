const vacancyService = require("../services/vacancyService");
const responseFormatter = require("../utils/responseFormatter");

/**
 * Function to list all vacancies
 */
const listVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyService.getVacancies();
    res
      .status(200)
      .json(responseFormatter(vacancies, "Vacancies fetched successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Function to get vacancy details by ID
 */
const getVacancyById = async (req, res) => {
  const { id } = req.params;
  try {
    const vacancy = await vacancyService.getVacancyById(id);
    if (!vacancy) {
      return res
        .status(404)
        .json(responseFormatter(null, "Vacancy not found", 404));
    }
    res
      .status(200)
      .json(responseFormatter(vacancy, "Vacancy details fetched successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Function to create a new vacancy
 */
const createVacancy = async (req, res) => {
  const vacancyData = req.body;
  try {
    const vacancy = await vacancyService.createVacancy(vacancyData);
    res
      .status(201)
      .json(responseFormatter(vacancy, "Vacancy created successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

/**
 * Function to update a vacancy by ID
 */
const updateVacancy = async (req, res) => {
  const { id } = req.params;
  const vacancyData = req.body;
  try {
    const vacancy = await vacancyService.updateVacancy(id, vacancyData);
    if (!vacancy) {
      return res
        .status(404)
        .json(responseFormatter(null, "Vacancy not found", 404));
    }
    res
      .status(200)
      .json(responseFormatter(vacancy, "Vacancy updated successfully"));
  } catch (error) {
    res.status(500).json(responseFormatter(null, error.message, 500));
  }
};

module.exports = {
  listVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
};
