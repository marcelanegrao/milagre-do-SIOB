import { Router } from "express";
import { OcorrenciaController } from "./ocorrencia.controller";
import { validate } from "../../shared/http/middlewares/validate";
import { createOcorrenciaSchema, updateOcorrenciaSchema } from "./ocorrencia.validator";
import { authenticateToken } from "../../shared/http/middlewares/authMiddleware";

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

ocorrenciaRoutes.use(authenticateToken);

ocorrenciaRoutes.post("/", validate(createOcorrenciaSchema), controller.create);
ocorrenciaRoutes.get("/", controller.getAll);
ocorrenciaRoutes.get("/:id", controller.getById);
ocorrenciaRoutes.put("/:id", validate(updateOcorrenciaSchema), controller.update);
ocorrenciaRoutes.delete("/:id", controller.delete);

export default ocorrenciaRoutes;
