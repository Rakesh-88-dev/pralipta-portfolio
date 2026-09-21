import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down...`);

      server.close(async () => {
        try {
          const mongoose = await import("mongoose");

          await mongoose.default.connection.close();

          console.log("MongoDB connection closed.");
          process.exit(0);
        } catch (error) {
          console.error(
            "Shutdown error:",
            error.message
          );

          process.exit(1);
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();