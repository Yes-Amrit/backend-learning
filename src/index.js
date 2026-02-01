import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

console.log("Environment loaded");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");

connectDB()
  .then(() => {
    // Add error listener for app
    app.on("error", (error) => {
      console.log("Express app error:", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MONGODB connection failed !!", err);
    process.exit(1);
  });