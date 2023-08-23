import Express from "express";
import { verifyToken } from "../middlewares/auth.js";
const router = Express.Router();

const a = () => {
  console.log("adsa");
};
router.get("/Home", verifyToken, a);
export default router;
