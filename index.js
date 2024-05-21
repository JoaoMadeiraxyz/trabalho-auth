const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes");
const sequelize = require("./db");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/api", userRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Unable to synchronize the database:", error);
  });
