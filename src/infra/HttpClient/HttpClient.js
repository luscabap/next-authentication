import { tokenService } from "../../services/token/tokenService";

export async function HttpClient(fetchUrl, fetchOptions){
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
  }
  return fetch(fetchUrl, options)
    .then(async (respostaServidor) => {
      return {
        ok: respostaServidor.ok,
        status: respostaServidor.status,
        statusText: respostaServidor.statusText,
        body: await respostaServidor.json(),
      }
    })
    .then(async (response) => {
      if(!fetchOptions.refresh) return response;
      if(response.status !== 401) return response;
      console.log('Middleware: Rodar código para atualizar o token');

      const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
        method: "GET"
      })
      console.log(refreshResponse);
        const newAcessToken = refreshResponse.body.data.access_token;
        const newRefreshToken = refreshResponse.body.data.refresh_token;
        console.log("tokens", newAcessToken, newRefreshToken)

        tokenService.saveToken(newAcessToken);

        const retryResponse = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: {
            "Authorization": `Bearer ${newAcessToken}`
          }
        })

        return retryResponse;
    });
  }
