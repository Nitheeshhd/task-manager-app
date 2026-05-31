import dotenv from "dotenv";
import app from "./src/app.js";
import initDB from "./src/config/initDb.js";

dotenv.config();

console.log("Database URL Loaded");

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  await initDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

};

startServer();