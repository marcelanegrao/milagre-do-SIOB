import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { env } from "./config/environment";
import { errorMiddleware } from "./shared/http/middlewares/errorMiddleware";

// Rotas
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import ocorrenciaRoutes from "./modules/ocorrencias/ocorrencia.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import relatorioRoutes from "./modules/relatorios/relatorio.routes";

const app = express();

// 1. Middlewares Globais
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// 2. Rota Raiz (Health Check)
app.get("/", (req, res) => {
  res.send("API SIOB está online! 🚒");
});

// 3. Rotas da Aplicação
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/ocorrencias", ocorrenciaRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/relatorios", relatorioRoutes);

// 4. Tratamento de Erros (Sempre o último)
app.use(errorMiddleware);

// 5. Inicialização
const PORT = env.port || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

export default app;
