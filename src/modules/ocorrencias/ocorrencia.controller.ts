import { Request, Response } from "express";
import { OcorrenciaService } from "./ocorrencia.service";

const service = new OcorrenciaService();


interface AuthRequest extends Request {
  user?: { userId: string; profile: string };
}

export class OcorrenciaController {
  async create(req: AuthRequest, res: Response) {
    const userId = req.user?.userId; 
    
    if (!userId) {
      return res.status(401).json({ error: "Usuário não identificado no token" });
    }

    const result = await service.create(req.body, userId);
    return res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await service.getAll(req.query);
    return res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await service.getById(id);
    return res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await service.update(id, req.body);
    return res.json(result);
  }
}
