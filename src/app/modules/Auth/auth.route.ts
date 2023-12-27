import { Router } from "express";
import { userController } from "../User/user.controller";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", AuthControllers.loginUser);
router.post(
  "/change-password",
  auth("admin", "user"),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
