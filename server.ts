import express from "express";
import pixRoutes from "./routes/pixRoutes";
import cardRoutes from "./routes/cardRoutes";

const app = express();
app.use(express.json());
app.use("/api/pix", pixRoutes);
app.use("/api/cartao", cardRoutes);

app.listen(3000, () => console.log("🚀 Servidor Efí rodando na porta 3000"));
