import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import inboxRouter from "./routes/inboxRoute.js";
import listRouter from "./routes/listRoutes.js";
import boardRouter from "./routes/boardRoute.js";
import cardRouter from "./routes/cardRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://trello-seven-pi.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


app.use("/api/auth", router);
app.use('/inbox',inboxRouter);
app.use('/board',boardRouter);
app.use('/list',listRouter);
app.use('/card',cardRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/ping", (req, res) => {
  res.json({ message: "Server alive" });
});

/* ---------- DB + SERVER ---------- */
const PORT = process.env.PORT || 6868;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
