import { ApolloServer } from "@apollo/server";
import WebSocket from "ws";
import { DatabaseDataSource } from "./app.db";
import appModule from "./app.module";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import { graphqlUploadExpress } from "graphql-upload";
import runSeeders from "./app.seed";

const app = express();
const PORT = process.env.PORT ? +process.env.PORT : 9000;

const bootstrap = async () => {
  try {
    DatabaseDataSource.initialize().catch((error) => console.log(error));
    const httpServer = createServer(app);
    const maxFileSize = 1000000 * 15; // 15 MB
    const maxFiles = 25;

    const wsServer = new WebSocket.Server({
      server: httpServer,
      path: "/graphql",
    });

    const serverCleanup = useServer({ schema: await appModule }, wsServer);

    const server = new ApolloServer({
      schema: await appModule,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });

    await server.start();
    app.use(graphqlUploadExpress({ maxFileSize, maxFiles }));
    app.use("/graphql", cors<cors.CorsRequest>(), json(), expressMiddleware(server));
    app.use("/static", express.static("public/static"));

    httpServer.listen(PORT, () => {
      runSeeders();
      console.log(`🚀  Sellia Service is ready at: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
