import express from "express";
import cors from "cors"
import { PORT, FRONTEND_URL } from "./config.js"
import routes from "./routes/routes.js"
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

app.use(routes);
app.use(taskRoutes);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
