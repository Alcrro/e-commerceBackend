import { config } from "./config";
import app from "./src/infrastructure/http/server";
import { log } from "node:console";

// Start the server only after connecting to the database
(async () => {
  try {
    await import("./src/infrastructure/config/dbConfig").then(
      ({ default: connectDB }) => connectDB()
    );
    app.listen(config.PORT, () => log(`Server running on port ${config.PORT}`));
  } catch (error) {
    log("Failed to start the server:", error);
    process.exit(1); // Exit if there's a failure in connecting to the database
  }
})();
