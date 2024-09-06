import express from "express";
import cors from "cors"
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT, FRONTEND_URL } from "./config.js"
import routes from "./routes/routes.js"
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use(routes);
app.use(taskRoutes);

// Distribución de archivos estáticos (client built)
// app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
