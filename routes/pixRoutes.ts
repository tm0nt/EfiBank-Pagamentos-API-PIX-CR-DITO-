import { Router } from "express";
import { criarPix, consultarPix } from "../services/pixService";

const router = Router();

router.post("/criar", async (req, res) => {
  try {
    const resp = await criarPix(req.body);
    res.json(resp);
  } catch (err: any) {
    res.status(500).json(err.response?.data || err.message);
  }
});

router.get("/consultar/:txid", async (req, res) => {
  try {
    const resp = await consultarPix(req.params.txid);
    res.json(resp);
  } catch (err: any) {
    res.status(500).json(err.response?.data || err.message);
  }
});

export default router;
