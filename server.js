const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiError = require("./utils/ApiError");
const globalError = require("./middleware/errormiddleware");

dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/categories", categoryRoute);

app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalError);

const PORT = Number(process.env.PORT) || 8000;

const startServer = async () => {
  await dbConnection();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error(`server startup failed: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection: ${error.message}`);
  process.exit(1);
});

module.exports = app;
