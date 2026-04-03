import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import { authenticate, authorize } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/auth", authRoutes);

app.get(
    "/api/protected",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "You are authorized",
        });
    }
);

export default app;