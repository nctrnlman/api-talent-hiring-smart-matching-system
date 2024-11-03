import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       fullname: "Alice Johnson",
  //       birthOfDate: new Date("1990-04-15"),
  //       gender: "female",
  //       address: "123 Apple St",
  //       phoneNumber: "081234567890",
  //       email: "alice.johnson@example.com",
  //       password: "password123",
  //       cv: "https://example.com/cv/alicejohnson",
  //       instagram: "https://instagram.com/alicejohnson",
  //       twitter: "https://twitter.com/alicejohnson",
  //       linkedin: "https://linkedin.com/in/alicejohnson",
  //       portfolio: "https://example.com/portfolio/alicejohnson",
  //       role: "CANDIDATE",
  //       yearOfExperience: 5,
  //       summary:
  //         "Experienced software developer with expertise in frontend and backend development.",
  //       job: "Full Stack Developer",
  //       jobExperiences: JSON.stringify([
  //         {
  //           companyName: "TechCorp",
  //           position: "Frontend Developer",
  //           startDate: "2015-08-10",
  //           endDate: "2018-06-20",
  //           summary:
  //             "Worked on various frontend projects using React and Angular.",
  //           untilNow: false,
  //         },
  //         {
  //           companyName: "WebSolutions",
  //           position: "Full Stack Developer",
  //           startDate: "2018-08-01",
  //           untilNow: true,
  //           summary: "Leading a team of developers in full stack projects.",
  //         },
  //       ]),
  //     },
  //     {
  //       fullname: "Brian Taylor",
  //       birthOfDate: new Date("1985-07-09"),
  //       gender: "male",
  //       address: "789 Elm Ave",
  //       phoneNumber: "085123459876",
  //       email: "brian.taylor@example.com",
  //       password: "securePass789",
  //       cv: "https://example.com/cv/briantaylor",
  //       instagram: "https://instagram.com/briantaylor",
  //       twitter: "https://twitter.com/briantaylor",
  //       linkedin: "https://linkedin.com/in/briantaylor",
  //       portfolio: "https://example.com/portfolio/briantaylor",
  //       role: "CANDIDATE",
  //       yearOfExperience: 12,
  //       summary:
  //         "Skilled project manager with a proven track record in large-scale projects.",
  //       job: "Project Manager",
  //       jobExperiences: JSON.stringify([
  //         {
  //           companyName: "GlobalTech",
  //           position: "Junior Project Manager",
  //           startDate: "2010-03-15",
  //           endDate: "2015-09-01",
  //           summary:
  //             "Assisted in managing multiple software development projects.",
  //           untilNow: false,
  //         },
  //         {
  //           companyName: "InnovateX",
  //           position: "Project Manager",
  //           startDate: "2015-10-01",
  //           untilNow: true,
  //           summary:
  //             "Managed a team for multi-million dollar software solutions.",
  //         },
  //       ]),
  //     },
  //     {
  //       fullname: "Carla Gomez",
  //       birthOfDate: new Date("1992-11-30"),
  //       gender: "female",
  //       address: "456 Maple Drive",
  //       phoneNumber: "089876543210",
  //       email: "carla.gomez@example.com",
  //       password: "password123",
  //       cv: "https://example.com/cv/carlagomez",
  //       instagram: "https://instagram.com/carlagomez",
  //       twitter: "https://twitter.com/carlagomez",
  //       linkedin: "https://linkedin.com/in/carlagomez",
  //       portfolio: "https://example.com/portfolio/carlagomez",
  //       role: "CANDIDATE",
  //       yearOfExperience: 3,
  //       summary:
  //         "Creative UI/UX designer with a passion for user-centered design.",
  //       job: "UI/UX Designer",
  //       jobExperiences: JSON.stringify([
  //         {
  //           companyName: "DesignHub",
  //           position: "Junior Designer",
  //           startDate: "2018-01-05",
  //           endDate: "2020-07-10",
  //           summary: "Worked on various design projects for startups.",
  //           untilNow: false,
  //         },
  //         {
  //           companyName: "PixelPerfect",
  //           position: "UI/UX Designer",
  //           startDate: "2020-08-01",
  //           untilNow: true,
  //           summary: "Lead designer for a range of client projects.",
  //         },
  //       ]),
  //     },
  //     {
  //       fullname: "David Kim",
  //       birthOfDate: new Date("1993-02-20"),
  //       gender: "male",
  //       address: "789 Sunset Blvd",
  //       phoneNumber: "082312349876",
  //       email: "david.kim@example.com",
  //       password: "pass2023",
  //       cv: "https://example.com/cv/davidkim",
  //       instagram: "https://instagram.com/davidkim",
  //       twitter: "https://twitter.com/davidkim",
  //       linkedin: "https://linkedin.com/in/davidkim",
  //       portfolio: "https://example.com/portfolio/davidkim",
  //       role: "CANDIDATE",
  //       yearOfExperience: 7,
  //       summary:
  //         "Back-end engineer with expertise in microservices and cloud solutions.",
  //       job: "Backend Engineer",
  //       jobExperiences: JSON.stringify([
  //         {
  //           companyName: "DataWorks",
  //           position: "Backend Developer",
  //           startDate: "2017-05-15",
  //           endDate: "2020-03-01",
  //           summary: "Developed REST APIs and managed backend operations.",
  //           untilNow: false,
  //         },
  //         {
  //           companyName: "TechFusion",
  //           position: "Senior Backend Engineer",
  //           startDate: "2020-04-01",
  //           untilNow: true,
  //           summary: "Led backend team in creating scalable solutions.",
  //         },
  //       ]),
  //     },
  //     {
  //       fullname: "Eva Williams",
  //       birthOfDate: new Date("1988-06-18"),
  //       gender: "female",
  //       address: "555 Ocean Lane",
  //       phoneNumber: "083445677899",
  //       email: "eva.williams@example.com",
  //       password: "qwerty123",
  //       cv: "https://example.com/cv/evawilliams",
  //       instagram: "https://instagram.com/evawilliams",
  //       twitter: "https://twitter.com/evawilliams",
  //       linkedin: "https://linkedin.com/in/evawilliams",
  //       portfolio: "https://example.com/portfolio/evawilliams",
  //       role: "CANDIDATE",
  //       yearOfExperience: 9,
  //       summary:
  //         "Senior product designer with extensive experience in mobile applications.",
  //       job: "Product Designer",
  //       jobExperiences: JSON.stringify([
  //         {
  //           companyName: "AppMasters",
  //           position: "Junior Product Designer",
  //           startDate: "2014-09-10",
  //           endDate: "2018-05-15",
  //           summary: "Created user interfaces for mobile apps.",
  //           untilNow: false,
  //         },
  //         {
  //           companyName: "CreativeLabs",
  //           position: "Senior Product Designer",
  //           startDate: "2018-06-01",
  //           untilNow: true,
  //           summary: "Led design for mobile applications used globally.",
  //         },
  //       ]),
  //     },
  //     // Add remaining users similarly...
  //   ],
  // });

  // Seeder untuk JobLevel
  await prisma.jobLevel.createMany({
    data: [
      { name: "Intern" },
      { name: "Junior" },
      { name: "Mid" },
      { name: "Senior" },
      { name: "Lead" },
      { name: "Manager" },
      { name: "Director" },
      { name: "VP" },
      { name: "C-Level" },
    ],
  });

  // Seeder untuk EmploymentStatus
  await prisma.employmentStatus.createMany({
    data: [
      { name: "Full-Time" },
      { name: "Part-Time" },
      { name: "Contract" },
      { name: "Temporary" },
      { name: "Internship" },
      { name: "Freelance" },
    ],
  });

  // Seeder untuk EducationLevel
  await prisma.educationLevel.createMany({
    data: [
      { name: "High School" },
      { name: "Associate Degree" },
      { name: "Bachelor's Degree" },
      { name: "Master's Degree" },
      { name: "Doctorate" },
    ],
  });

  // Seeder untuk SoftSkill
  await prisma.softSkill.createMany({
    data: [
      { name: "Communication" },
      { name: "Teamwork" },
      { name: "Problem Solving" },
      { name: "Adaptability" },
      { name: "Creativity" },
      { name: "Critical Thinking" },
      { name: "Time Management" },
      { name: "Leadership" },
      { name: "Work Ethic" },
    ],
  });

  // Seeder untuk HardSkill
  await prisma.hardSkill.createMany({
    data: [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "SQL" },
      { name: "React" },
      { name: "Node.js" },
      { name: "HTML/CSS" },
      { name: "Data Analysis" },
      { name: "Machine Learning" },
    ],
  });

  console.log("Master data seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
