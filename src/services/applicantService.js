// services/applicantService.js
const applicantRepository = require("../repositories/applicantRepository");
const recruitmentProcessRepository = require("../repositories/recruitmentProcessRepository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ApplicantService {
  async getApplicants(employerId, userId, status) {
    // Ambil data applicants dari repository (tidak perlu menerima employerId lagi)
    const applicants = await applicantRepository.findApplicants(
      employerId,
      userId,
      status
    );

    if (applicants.length === 0) {
      return applicants;
    }

    // Ambil vacancyId dari applicant pertama (asumsi semua applicant terkait dengan vacancy yang sama)
    const vacancyIdInt = Number(applicants[0].vacancyId);

    // Pastikan vacancyId adalah angka yang valid
    if (isNaN(vacancyIdInt)) {
      return applicants;
    }

    // Ambil data vacancy berdasarkan vacancyId
    const vacancy = await prisma.vacancy.findUnique({
      where: { id: vacancyIdInt },
      select: {
        id: true,
        vacancyName: true,
        minAge: true,
        maxAge: true,
        softSkills: true,
        hardSkills: true,
        minEducationLevel: true,
        minYearExperience: true,
        jobLevel: true,
        employmentStatus: true,
        gender: true,
      },
    });

    if (!vacancy) {
      throw new Error("Vacancy not found");
    }
    const vacancySoftSkills = JSON.parse(vacancy.softSkills).map(Number);
    const vacancyHardSkills = JSON.parse(vacancy.hardSkills).map(Number);

    const softSkillsList = await prisma.softSkill.findMany({
      select: { id: true, name: true }, // Ambil id dan name saja
    });

    // Mengambil semua hard skills dari database
    const hardSkillsList = await prisma.hardSkill.findMany({
      select: { id: true, name: true }, // Ambil id dan name saja
    });

    // Fungsi untuk menghitung persentase kecocokan
    const calculateMatchPercentage = (candidate, vacancy) => {
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

      const criteriaChecked = []; // Array untuk menyimpan kriteria yang diperiksa

      // 1. Umur cocok (Age)
      if (candidate.birthOfDate) {
        const age =
          new Date().getFullYear() -
          new Date(candidate.birthOfDate).getFullYear();
        matchDetails.age.candidate = age;
        matchDetails.age.vacancy = vacancy.maxAge ? vacancy.maxAge : "-";

        // Cek apakah kandidat memenuhi minAge dan maxAge
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

      // 2. Pendidikan cocok (Education Level)
      if (candidate.educationLevelId && vacancy.minEducationLevel.id) {
        matchDetails.education.candidate = candidate.educationLevel.name;
        matchDetails.education.vacancy = vacancy.minEducationLevel.name;

        if (candidate.educationLevelId == vacancy.minEducationLevel.id) {
          matchScore++;
          matchDetails.education.match = true;
        }
        totalCriteria++;
        criteriaChecked.push("education");
      }

      // 3. Jenis kelamin cocok (Gender)
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

      // 4. Pengalaman kerja (minYearExperience)
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

      // 5. SoftSkills
      if (candidate.softSkills && vacancy.softSkills) {
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

      // 6. HardSkills
      if (candidate.hardSkills && vacancy.hardSkills) {
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

      // Hitung persentase kecocokan
      const matchPercentage =
        totalCriteria > 0 ? (matchScore / totalCriteria) * 100 : 0;

      return {
        matchPercentage: matchPercentage.toFixed(2),
        matchDetails,
        criteriaChecked,
      };
    };

    const applicantsWithMatch = applicants.map((applicant) => {
      const { matchPercentage, matchDetails, criteriaChecked } =
        calculateMatchPercentage(applicant.user, vacancy);
      return {
        ...applicant,
        matchPercentage,
        matchDetails,
        criteriaChecked,
      };
    });

    return applicantsWithMatch;
  }

  async applyForVacancy(applicantData) {
    return await applicantRepository.createApplicant(applicantData);
  }

  async updateApplicantStatus(applicantId, newStatus) {
    const validStatuses = ["IN_PROGRESS", "REJECTED", "WITHDRAWN", "ACCEPTED"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error("Invalid status provided");
    }
    return await applicantRepository.updateApplicantStatus(
      applicantId,
      newStatus
    );
  }

  // Fungsi untuk memindahkan applicant ke tahap berikutnya dalam proses rekrutmen
  async moveToNextStep(applicantId, result, summary, flow) {
    // 1. Menambahkan data ke tabel RecruitmentProcess
    const recruitmentProcess =
      await recruitmentProcessRepository.createRecruitmentProcess({
        applicantId,
        result,
        summary,
        flow,
      });

    // 2. Memperbarui status applicant ke IN_PROGRESS
    await applicantRepository.updateApplicantStatus(
      applicantId,
      "IN_PROGRESS",
      flow
    );

    // Kembalikan hasil proses rekrutmen
    return recruitmentProcess;
  }
}

module.exports = new ApplicantService();
