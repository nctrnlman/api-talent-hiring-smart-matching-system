const vacancyRepository = require("../repositories/vacancyRepository");

class VacancyService {
  async getVacancies() {
    return await vacancyRepository.findVacancies();
  }

  async getVacancyById(id) {
    return await vacancyRepository.findVacancyById(id);
  }

  async createVacancy(vacancyData) {
    return await vacancyRepository.createVacancy(vacancyData);
  }

  async updateVacancy(id, vacancyData) {
    return await vacancyRepository.updateVacancy(id, vacancyData);
  }
}

module.exports = new VacancyService();
