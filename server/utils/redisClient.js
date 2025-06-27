import { createClient } from "redis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Ensure dotenv is loaded (in case it's not already)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Optional: Add validation
if (!process.env.REDIS_HOST || !process.env.REDIS_PASSWORD) {
	throw new Error(
		"Missing REDIS_HOST or REDIS_PASSWORD in environment variables."
	);
}

const client = createClient({
	username: "default", // Most Redis Cloud setups use "default"
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT, // You can make this also configurable via env if needed
	},
});

client.on("connect", () => console.log("✅ Redis Client Connected"));
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

// Immediately connect
await client.connect();

export default client;

export async function clearAllRedisCache() {
	try {
		await client.flushAll(); // or flushDb() for only current DB
		console.log("🧹 Redis cache flushed successfully.");
	} catch (err) {
		console.error("❌ Error clearing Redis cache:", err);
	}
}