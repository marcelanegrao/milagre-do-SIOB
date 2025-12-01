import { Router } from "express";
import { OcorrenciaController } from "./ocorrencia.controller";
import { validate } from "../../shared/http/middlewares/validate";
import { createOcorrenciaSchema, updateOcorrenciaSchema } from "./ocorrencia.validator";
import { authenticateToken } from "../../middleware/authMiddleware";

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

// Aplica o middleware de autenticação em TODAS as rotas abaixo
ocorrenciaRoutes.use(authenticateToken);

/**
 * @swagger
 * /api/v1/ocorrencias:
 * post:
 * tags: [Ocorrencias]
 * description: Cria uma nova ocorrência
 */
ocorrenciaRoutes.post("/", validate(createOcorrenciaSchema), controller.create);

/**
 * @swagger
 * /api/v1/ocorrencias:
 * get:
 * tags: [Ocorrencias]
 * description: Lista ocorrências com filtros (status, bairro, tipo)
 */
ocorrenciaRoutes.get("/", controller.getAll);

ocorrenciaRoutes.get("/:id", controller.getById);
ocorrenciaRoutes.put("/:id", validate(updateOcorrenciaSchema), controller.update);

export default ocorrenciaRoutes;
