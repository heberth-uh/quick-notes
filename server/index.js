import express from "express";
import cors from "cors"
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT, FRONTEND_URL } from "./config.js"
import routes from "./routes/routes.js"
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

// app.use(cors({ origin: FRONTEND_URL }));
app.use(cors());
app.use(express.json());

//healthcheck
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use(routes);
app.use(taskRoutes);

// Distribución de archivos estáticos (client built)
app.use(express.static(join(__dirname, '../client/dist')))

// The "catch-all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
});

// Manejo de señales
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
