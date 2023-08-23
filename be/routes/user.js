import Express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { refreshToken, signin, signup } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";
import { updateUsers } from "../controllers/usersController.js";
const router = Express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refreshToken", refreshToken);
router.put("/:id", verifyToken, updateUsers);
export default router;
