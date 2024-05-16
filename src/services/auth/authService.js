import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "../token/tokenService";

export const authService = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST',
      body: { username, password }
    })
    .then(async (respostaServidor) => {
      if (!respostaServidor.ok){
        throw new Error ('Usuário ou senha inválidos');
      }
      const body = respostaServidor.body;
      tokenService.saveToken(body.data.access_token);
    })
  }
};
