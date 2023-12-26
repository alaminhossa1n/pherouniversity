import { Router } from "express";
import { userController } from "../User/user.controller";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
