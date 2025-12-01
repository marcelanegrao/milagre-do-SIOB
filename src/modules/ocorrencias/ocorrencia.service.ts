import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../shared/errors/api-errors";

const prisma = new PrismaClient();

export class OcorrenciaService {
  async create(data: any, userId: string) {
    // Cria a ocorrência vinculando ao usuário logado
    const novaOcorrencia = await prisma.ocorrencia.create({
      data: {
        ...data,
        id_usuario_fk: userId,
      },
    });
    return novaOcorrencia;
  }

  async getAll(filters: any) {
    const where: any = {};
    
    // Filtros dinâmicos baseados na Query String
    if (filters.status) where.status = filters.status;
    if (filters.prioridade) where.prioridade = filters.prioridade;
    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.bairro) where.bairro = filters.bairro;
    
    // Filtro de data (se fornecido)
    if (filters.dataInicio) {
      where.data_acionamento = { gte: filters.dataInicio };
    }

    const ocorrencias = await prisma.ocorrencia.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        // Traz apenas nome e matricula de quem abriu
        usuario: { select: { nome: true, matricula: true } }
      }
    });
    return ocorrencias;
  }

  async getById(id: string) {
    const ocorrencia = await prisma.ocorrencia.findUnique({
      where: { id },
      include: {
        vitimas: true,
        midias: true,
        usuario: { select: { nome: true, cargo: true } }
      }
    });

    if (!ocorrencia) throw new NotFoundError("Ocorrência não encontrada");
    return ocorrencia;
  }

  async update(id: string, data: any) {
    const exists = await prisma.ocorrencia.findUnique({ where: { id } });
    if (!exists) throw new NotFoundError("Ocorrência não encontrada");

    return await prisma.ocorrencia.update({
      where: { id },
      data,
    });
  }
}
