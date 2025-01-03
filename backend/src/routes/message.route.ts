import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import protectRoute from "../middlewares/protectRoute"
const router = express.Router();

router.use(protectRoute);
router.post("/send/:id", sendMessage);
router.get("/:id", getMessages);

export default router;