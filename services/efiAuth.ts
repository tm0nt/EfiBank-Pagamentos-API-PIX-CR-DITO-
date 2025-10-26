import fs from "fs";
import https from "https";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getAccessToken() {
  const certificado = fs.readFileSync(process.env.EFI_CERT_PATH!);
  const auth = Buffer.from(`${process.env.EFI_CLIENT_ID}:${process.env.EFI_CLIENT_SECRET}`).toString("base64");

  const agent = new https.Agent({ pfx: certificado, passphrase: "" });

  const { data } = await axios.post(
    `${process.env.EFI_ENV}/oauth/token`,
    { grant_type: "client_credentials" },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
    }
  );
  return data.access_token;
}
