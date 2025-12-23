const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

//generate s3 sign url
app.use("/api/s3", require("./routes/s3.routes"));

// ⬇️ Use theme routes
const themeRoutes = require("./routes/ThemeRoutes");
app.use("/api/themes", themeRoutes);

const themeConfigRoutes = require("./routes/ThemeConfigRoutes");
app.use("/api/theme-config", themeConfigRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚴‍♂️");
});
const customizationRoutes = require("./routes/CustomizationRoutes");
app.use("/api/customizations", customizationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
