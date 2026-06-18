import cors from "cors";
import express from "express";
import { createServer } from "http";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import connectDB from "./config/mongodb.js";
import responseHandler from "./utils/responseHandler.js";

const app = express();
const server = createServer(app);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('etag');

app.get("/", (req, res) => {
    try {
        return responseHandler.success(res, "Netsurf Server is running successfully");
    } catch (error) {
        return responseHandler.error(res, error?.message);
    }
});

app.use("/api/v1/", routes);

app.get("*", (req, res) => {
    return responseHandler.error(res, "Route not found");
});

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`✅ Netsurf Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error.message);
    }
};

startServer();
