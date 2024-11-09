// src/services/candidateService.js
const userRepository = require("../repositories/userRepository");

class CandidateService {
  async getCandidates() {
    return await userRepository.findCandidates();
  }

  async getCandidateById(id) {
    return await userRepository.findCandidateById(id);
  }

  async updateCandidate(id, candidateData) {
    return await userRepository.updateCandidateById(id, candidateData);
  }
}

module.exports = new CandidateService();
