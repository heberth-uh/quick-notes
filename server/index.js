import express from "express";
import cors from "cors"
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT } from "./config.js"
import routes from "./routes/routes.js"
import taskRoutes from "./routes/tasks.routes.js";
import { initializeDatabase } from "../database/initialize-db.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await initializeDatabase();

        app.use(routes);
        app.use(taskRoutes);

        // distribución de archivos estáticos (client built)
        app.use(express.static(join(__dirname, '../client/dist')))

        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);

    } catch (error) {
        console.error('errorororor')
    }
}

startServer();
