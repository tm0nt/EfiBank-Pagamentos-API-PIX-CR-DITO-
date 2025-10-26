import { Router } from "express";
import { simularParcelamento, criarPagamentoCartao } from "../services/cardService";

const router = Router();

router.post("/simular", async (req, res) => {
  try {
    const data = await simularParcelamento(req.body.valor, req.body.parcelas);
    res.json(data);
  } catch (err: any) {
    res.status(500).json(err.response?.data || err.message);
  }
});

router.post("/pagar", async (req, res) => {
  try {
    const data = await criarPagamentoCartao(req.body);
    res.json(data);
  } catch (err: any) {
    res.status(500).json(err.response?.data || err.message);
  }
});

export default router;
