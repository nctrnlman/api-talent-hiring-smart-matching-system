const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");
const masterDataRoutes = require("./routes/masterDataRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const setupSwagger = require("./config/swagger");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Gunakan routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/master", masterDataRoutes);
app.use("/api/applicants", applicantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
