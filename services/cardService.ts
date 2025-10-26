import axios from "axios";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import { getAccessToken } from "./efiAuth";
dotenv.config();

export async function simularParcelamento(valor: number, parcelas: number) {
  const certificado = fs.readFileSync(process.env.EFI_CERT_PATH!);
  const agent = new https.Agent({ pfx: certificado, passphrase: "" });
  const token = await getAccessToken();

  const { data } = await axios.post(
    `${process.env.EFI_ENV}/v1/payments/simulate/installments`,
    {
      amount: valor,
      installments: parcelas,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent: agent,
    }
  );
  return data;
}

export async function criarPagamentoCartao(payload: any) {
  const certificado = fs.readFileSync(process.env.EFI_CERT_PATH!);
  const agent = new https.Agent({ pfx: certificado, passphrase: "" });
  const token = await getAccessToken();

  const body = {
    payment: {
      method: "credit_card",
      amount: payload.valor,
      installments: payload.parcelas,
      credit_card: {
        holder_name: payload.nome,
        number: payload.numero_cartao,
        exp_month: payload.mes_validade,
        exp_year: payload.ano_validade,
        cvv: payload.cvv,
      },
    },
    customer: {
      name: payload.nome,
      email: payload.email,
      cpf: payload.cpf_cnpj,
      phone_number: payload.telefone,
    },
  };

  const { data } = await axios.post(`${process.env.EFI_ENV}/v1/payments/credit-card`, body, {
    headers: { Authorization: `Bearer ${token}` },
    httpsAgent: agent,
  });

  return data;
}
