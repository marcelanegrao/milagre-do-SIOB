import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../shared/http/middlewares/validate";
import { registerSchema, loginSchema } from "./auth.validator";

const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/login", validate(loginSchema), controller.login);
authRoutes.post("/register", validate(registerSchema), controller.register);

export default authRoutes;
