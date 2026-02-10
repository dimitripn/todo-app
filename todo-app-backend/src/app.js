import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import sequelize from "./config/sequelize.js";

const app = express();

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connected...");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

sequelize
	.sync()
	.then(() => {
		console.log("Database synchronized...");
	})
	.catch((err) => {
		console.error("Error synchronizing the database:", err);
	});

app.use(
	cors({
		origin: "http://localhost:5173",
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the Todo App API");
});

export default app;
