import "dotenv/config";

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: [
          process.env.CLIENT_URL,
          process.env.ADMIN_URL,
        ].filter(Boolean),
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    app.set("io", io);

    httpServer.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down...`);

      httpServer.close(async () => {
        try {
          io.close();

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