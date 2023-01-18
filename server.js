const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error while connecting mongodb", error.message);
    process.exit(1);
  }
})();
