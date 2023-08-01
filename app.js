import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./routers/tweet.js";
import authRouter from "./routers/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";
import https from "https";
import fs from "fs";
import path from "path";
import process from "process";
import "express-async-errors";

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://kemezz.github.io/twitter-clone-frontend/*",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// routers
app.use("/tweet", tweetRouter);
app.use("/auth", authRouter);

// error handlers
app.use((_, res) => {
  res.sendStatus(404);
});
app.use((error, _, res) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log("mongodb connected!");
    try {
      const option = {
        ca: fs.readFileSync("/etc/letsencrypt/live/kemezz.com/fullchain.pem"),
        key: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/kemezz.com/privkey.pem"
            ),
            "utf8"
          )
          .toString(),
        cert: fs
          .readFileSync(
            path.resolve(
              process.cwd(),
              "/etc/letsencrypt/live/kemezz.com/cert.pem"
            ),
            "utf8"
          )
          .toString(),
      };
      const server = https.createServer(option, app).listen(config.host.port);
      initSocket(server);
    } catch (error) {
      console.error(
        error,
        "https 연결 오류 발생, http 서버로 연결을 시도합니다."
      );
      const server = app.listen(config.host.port);
      initSocket(server);
    }
  })
  .catch(console.error);
