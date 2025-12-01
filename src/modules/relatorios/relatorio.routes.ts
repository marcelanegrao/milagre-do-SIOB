import { Router } from "express";
import { RelatorioController } from "./relatorio.controller";
import { authenticateToken } from "../../shared/http/middlewares/authMiddleware";

const relatorioRoutes = Router();
const controller = new RelatorioController();

relatorioRoutes.use(authenticateToken);

relatorioRoutes.get("/", controller.export);

export default relatorioRoutes;
