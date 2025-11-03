import "reflect-metadata";
import cors from "cors";
import express from "express";
import dotenvFlow from "dotenv-flow";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@as-integrations/express5";

import { resolvers } from "./infrastructure/graphql/resolvers";
import { logger } from "./infrastructure/middlewares/logger";
import { typeDefs } from "./infrastructure/graphql/schema";
import { sequelize } from "./infrastructure/db/sequelize";
import { CronManager } from "./infrastructure/cron/cron-manager";
import { loggin } from "./infrastructure/graphql/plugins/loggin.plugin";
import { createLoaders } from "./infrastructure/graphql/loaders";

const startServer = async () => {
  dotenvFlow.config();

  const app = express();

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [loggin],
  });
  await server.start();

  app.use(
    "/graphql",
    logger,
    cors({ origin: "http://localhost:5173" }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        loaders: createLoaders(),
        req,
      }),
    })
  );

  const PORT = process.env.PORT || 4000;

  try {
    await sequelize.authenticate();
    console.log("[DATABASE]: Database connected");
  } catch (error) {
    console.error("[DATABASE]: Database connection failed:", error);
    process.exit(1);
  }

  // INICIAR CRON MANAGER
  const cronManager = new CronManager();
  cronManager.start();

  const serverInstance = app.listen(PORT, () => {
    console.log(`[SERVER]: Server ready at http://localhost:${PORT}/graphql`);
  });

  // GRACEFUL SHUTDOWN
  const shutdown = async () => {
    console.log("[SERVER]: Shutting down gracefully...");

    cronManager.stop();

    serverInstance.close(() => {
      console.log("[SERVER]: HTTP server closed");
    });

    await sequelize.close();
    console.log("[DATABASE]: Database connection closed");

    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer();
