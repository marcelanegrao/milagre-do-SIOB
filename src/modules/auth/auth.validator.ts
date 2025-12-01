import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    matricula: z.string().min(1, "Matrícula obrigatória"),
    // Senha opcional no cadastro (gerada auto se vazia)
    password: z.string().min(6).optional(),
    
    // Perfil de acesso
    profile: z.enum(["ADMIN", "ANALISTA", "CHEFE", "OPERADOR_CAMPO"]).default("ANALISTA"),
    
    // Vínculo com unidade (opcional)
    id_unidade_operacional_fk: z.string().uuid().nullable().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "Senha obrigatória"),
  }),
});
