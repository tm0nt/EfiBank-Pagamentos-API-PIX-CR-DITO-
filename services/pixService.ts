import fs from "fs";
import https from "https";
import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "./efiAuth";
dotenv.config();

export async function criarPix(dados: any) {
  const certificado = fs.readFileSync(process.env.EFI_CERT_PATH!);
  const agent = new https.Agent({ pfx: certificado, passphrase: "" });
  const token = await getAccessToken();

  const body = {
    calendario: { expiracao: 3600 },
    devedor: { nome: dados.nome, cpf: dados.cpf_cnpj },
    valor: { original: dados.valor.toFixed(2) },
    chave: process.env.EFI_PIX_KEY,
    solicitacaoPagador: `Pagamento de ${dados.tipo_produto}`,
  };

  const { data } = await axios.post(`${process.env.EFI_ENV}/v2/cob`, body, {
    headers: { Authorization: `Bearer ${token}` },
    httpsAgent: agent,
  });
  return data;
}

export async function consultarPix(txid: string) {
  const certificado = fs.readFileSync(process.env.EFI_CERT_PATH!);
  const agent = new https.Agent({ pfx: certificado, passphrase: "" });
  const token = await getAccessToken();
  const { data } = await axios.get(`${process.env.EFI_ENV}/v2/cob/${txid}`, {
    headers: { Authorization: `Bearer ${token}` },
    httpsAgent: agent,
  });
  return data;
}
