const masterDataRepository = require("../repositories/masterDataRepository");

class MasterDataService {
  async getJobLevels() {
    return await masterDataRepository.findJobLevels();
  }

  async getEmploymentStatuses() {
    return await masterDataRepository.findEmploymentStatuses();
  }

  async getSoftSkills() {
    return await masterDataRepository.findSoftSkills();
  }

  async getHardSkills() {
    return await masterDataRepository.findHardSkills();
  }

  async getEducLevels() {
    return await masterDataRepository.findEducLevels();
  }
}

module.exports = new MasterDataService();
