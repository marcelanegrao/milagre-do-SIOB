import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../shared/errors/api-errors";

const prisma = new PrismaClient();

export class OcorrenciaService {
  async create(data: any, userId: string) {
    const payload = {
      ...data,
      data_acionamento: new Date(data.data_acionamento),
      hora_acionamento: new Date(data.hora_acionamento),
      data_ocorrencia: data.data_ocorrencia ? new Date(data.data_ocorrencia) : undefined,
      id_usuario_fk: userId,
    };
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    return await prisma.ocorrencia.create({ data: payload });
  }

  async getAll(filters: any) {
    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.prioridade) where.prioridade = filters.prioridade;
    if (filters.tipo) where.tipo = filters.tipo;
    if (filters.bairro) where.bairro = filters.bairro;
    if (filters.dataInicio) where.data_acionamento = { gte: new Date(filters.dataInicio) };

    return await prisma.ocorrencia.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { usuario: { select: { nome: true, matricula: true } } }
    });
  }

  async getById(id: string) {
    const ocorrencia = await prisma.ocorrencia.findUnique({
      where: { id },
      include: {
        vitimas_detalhe: true,
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

    if (data.data_fechamento) data.data_fechamento = new Date(data.data_fechamento);

    return await prisma.ocorrencia.update({ where: { id }, data });
  }

  async delete(id: string) {
    const exists = await prisma.ocorrencia.findUnique({ where: { id } });
    if (!exists) throw new NotFoundError("Ocorrência não encontrada");

    await prisma.ocorrencia.delete({ where: { id } });
  }
}
