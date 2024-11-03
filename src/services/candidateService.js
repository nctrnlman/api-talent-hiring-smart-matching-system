// src/services/candidateService.js
const userRepository = require("../repositories/userRepository");

class CandidateService {
  async getCandidates() {
    return await userRepository.findCandidates();
  }

  async getCandidateById(id) {
    return await userRepository.findCandidateById(id);
  }
}

module.exports = new CandidateService();
