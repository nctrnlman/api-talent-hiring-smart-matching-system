// services/applicantService.js
const applicantRepository = require("../repositories/applicantRepository");

class ApplicantService {
  async getApplicants(vacancyId) {
    return await applicantRepository.findApplicants(vacancyId);
  }

  async applyForVacancy(applicantData) {
    return await applicantRepository.createApplicant(applicantData);
  }
}

module.exports = new ApplicantService();
