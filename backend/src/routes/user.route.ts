import express from "express";
import protectRoute from "../middlewares/protectRoute";
import { getUsersForSidebar } from "../controllers/user.controller";

const router = express.Router();

router.use(protectRoute);

router.get("/", getUsersForSidebar);

export default router;