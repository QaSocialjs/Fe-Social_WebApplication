import Express from "express";
import routerUser from "./routes/user.js";
import connectToDatabase from "./mongodb.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/home.js";
const app = Express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
connectToDatabase();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/api/v1/user", routerUser);
app.use("/api/v1", router);
app.use("/api/v1/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
  });
});
const port = 3000;
app.listen(port, () => {
  console.log("App running");
});
