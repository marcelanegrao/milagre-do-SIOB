import { z } from "zod";

export const createOcorrenciaSchema = z.object({
  body: z.object({
    data_acionamento: z.string().datetime(),
    hora_acionamento: z.string().datetime(),
    
    // Simplificado: removido o objeto de erro customizado para corrigir o erro de TS
    tipo: z.string().min(1, "Tipo é obrigatório"), 
    bairro: z.string().min(1, "Bairro é obrigatório"),
    
    subtipo: z.string().optional(),
    prioridade: z.enum(["ALTA", "MEDIA", "BAIXA"]).default("MEDIA"),
    status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA", "TROTE"]).default("PENDENTE"),
    
    endereco: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    observacoes: z.string().optional(),
    nr_aviso: z.string().optional(),
  }),
});

export const updateOcorrenciaSchema = z.object({
  body: z.object({
    status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA", "TROTE"]).optional(),
    prioridade: z.enum(["ALTA", "MEDIA", "BAIXA"]).optional(),
    data_fechamento: z.string().datetime().nullable().optional(),
    observacoes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
