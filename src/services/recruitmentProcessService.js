// services/recruitmentProcessService.js
const recruitmentProcessRepository = require("../repositories/recruitmentProcessRepository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RecruitmentProcessService {
  async getRecruitmentProcesses(employerId, flow, userId) {
    // Fetch recruitment processes
    const recruitmentProcesses =
      await recruitmentProcessRepository.getRecruitmentProcesses(
        employerId,
        flow,
        userId
      );

    // Fetch the list of skills only once to avoid repetitive DB calls
    const softSkillsList = await prisma.softSkill.findMany({
      select: { id: true, name: true },
    });

    const hardSkillsList = await prisma.hardSkill.findMany({
      select: { id: true, name: true },
    });

    // Calculate the match percentage for each applicant in recruitment processes
    const processesWithMatch = recruitmentProcesses.map((process) => {
      const { applicant } = process;

      // Ensure applicant and its associated vacancy are present
      if (!applicant || !applicant.vacancy) {
        return process; // If no applicant or no vacancy, return the process as is
      }

      const vacancy = applicant.vacancy;
      const vacancySoftSkills = JSON.parse(vacancy.softSkills).map(Number);
      const vacancyHardSkills = JSON.parse(vacancy.hardSkills).map(Number);

      const { matchPercentage, matchDetails, criteriaChecked } =
        this.calculateMatchPercentage(
          applicant.user,
          vacancy,
          vacancySoftSkills,
          vacancyHardSkills,
          softSkillsList,
          hardSkillsList
        );

      return {
        ...process,
        matchPercentage,
        matchDetails,
        criteriaChecked,
      };
    });

    return processesWithMatch;
  }

  // Add calculateMatchPercentage function here
  calculateMatchPercentage(
    candidate,
    vacancy,
    vacancySoftSkills,
    vacancyHardSkills,
    softSkillsList,
    hardSkillsList
  ) {
    let matchScore = 0;
    let totalCriteria = 0;
    let matchDetails = {
      age: { match: false, candidate: null, vacancy: null },
      education: { match: false, candidate: null, vacancy: null },
      gender: { match: false, candidate: null, vacancy: null },
      minYearExperience: { match: false, candidate: null, vacancy: null },
      softSkills: { match: false, candidate: [], vacancy: [] },
      hardSkills: { match: false, candidate: [], vacancy: [] },
    };

    const criteriaChecked = [];

    // Age matching
    if (candidate.birthOfDate) {
      const age =
        new Date().getFullYear() -
        new Date(candidate.birthOfDate).getFullYear();
      matchDetails.age.candidate = age;
      matchDetails.age.vacancy = vacancy.maxAge;

      if (
        vacancy.minAge &&
        age >= vacancy.minAge &&
        vacancy.maxAge &&
        age <= vacancy.maxAge
      ) {
        matchScore++;
        matchDetails.age.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("age");
    }

    // Education matching
    if (candidate.educationLevelId && vacancy.minEducationLevelId) {
      matchDetails.education.candidate = candidate.educationLevel?.name;
      matchDetails.education.vacancy = vacancy.minEducationLevel?.name;

      if (candidate.educationLevelId === vacancy.minEducationLevelId) {
        matchScore++;
        matchDetails.education.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("education");
    }

    // Gender matching
    if (candidate.gender && vacancy.gender) {
      matchDetails.gender.candidate = candidate.gender;
      matchDetails.gender.vacancy = vacancy.gender;

      if (candidate.gender === vacancy.gender) {
        matchScore++;
        matchDetails.gender.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("gender");
    }

    // Work experience matching
    if (candidate.yearOfExperience && vacancy.minYearExperience) {
      matchDetails.minYearExperience.candidate = candidate.yearOfExperience;
      matchDetails.minYearExperience.vacancy = vacancy.minYearExperience;

      if (candidate.yearOfExperience >= vacancy.minYearExperience) {
        matchScore++;
        matchDetails.minYearExperience.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("minYearExperience");
    }

    // Soft Skills matching
    if (candidate.softSkills && vacancySoftSkills) {
      const candidateSoftSkills = candidate.softSkills.map(Number);
      matchDetails.softSkills.candidate = candidateSoftSkills.map(
        (id) => softSkillsList.find((skill) => skill.id === id)?.name || id
      );
      matchDetails.softSkills.vacancy = vacancySoftSkills.map(
        (id) => softSkillsList.find((skill) => skill.id === id)?.name || id
      );

      const matchedSoftSkills = candidateSoftSkills.filter((skill) =>
        vacancySoftSkills.includes(skill)
      );
      if (matchedSoftSkills.length > 0) {
        matchScore++;
        matchDetails.softSkills.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("softSkills");
    }

    // Hard Skills matching
    if (candidate.hardSkills && vacancyHardSkills) {
      const candidateHardSkills = candidate.hardSkills.map(Number);
      matchDetails.hardSkills.candidate = candidateHardSkills.map(
        (id) => hardSkillsList.find((skill) => skill.id === id)?.name || id
      );
      matchDetails.hardSkills.vacancy = vacancyHardSkills.map(
        (id) => hardSkillsList.find((skill) => skill.id === id)?.name || id
      );

      const matchedHardSkills = candidateHardSkills.filter((skill) =>
        vacancyHardSkills.includes(skill)
      );
      if (matchedHardSkills.length > 0) {
        matchScore++;
        matchDetails.hardSkills.match = true;
      }
      totalCriteria++;
      criteriaChecked.push("hardSkills");
    }

    const matchPercentage =
      totalCriteria > 0 ? (matchScore / totalCriteria) * 100 : 0;

    return {
      matchPercentage: matchPercentage.toFixed(2),
      matchDetails,
      criteriaChecked,
    };
  }

  async updateProcessResult(id, result, summary) {
    try {
      // Await the recruitment process result and summary update
      const process = await recruitmentProcessRepository.updateProcessResult(
        id,
        result,
        summary
      );

      if (result === "NOT RECOMMENDED" && process.applicant) {
        await recruitmentProcessRepository.updateApplicantStatus(
          process.applicant.id,
          "REJECTED"
        );
      }

      if (result === "RECOMMENDED" && process.applicant.flow == "ONBOARDING") {
        await recruitmentProcessRepository.updateApplicantStatus(
          process.applicant.id,
          "ACCEPTED"
        );
      }

      return process;
    } catch (error) {
      throw new Error(`Failed to update recruitment process: ${error.message}`);
    }
  }
}

module.exports = new RecruitmentProcessService();
