import express from "express";
import { changePassword, deleteUser, getAllUsers, getCurrentUser, googleLogin, loginUser, saveUser, sendOTP, toggleUserStatus } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.get("/current", getCurrentUser)
userRouter.post("/sendMail", sendOTP)
userRouter.post("/changePW", changePassword)

userRouter.get("/admin/all", getAllUsers);
userRouter.patch("/admin/toggle/:id", toggleUserStatus);
userRouter.delete("/:userId", deleteUser);
export default userRouter;