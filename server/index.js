import express from "express";
import contentRoutes from "./routes/contentRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ allowedHeaders: "*" }));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/content", contentRoutes);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("MongoDB Connected Successfully!!");
	})
	.catch((err) => {
		console.error("MongoDB Connection Error:", err);
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
