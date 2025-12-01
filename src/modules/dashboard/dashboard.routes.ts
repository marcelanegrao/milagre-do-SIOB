import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { authenticateToken } from "../../shared/http/middlewares/authMiddleware";

const dashboardRoutes = Router();
const controller = new DashboardController();

dashboardRoutes.use(authenticateToken);

dashboardRoutes.get("/", controller.getKpis);

export default dashboardRoutes;
