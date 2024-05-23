import { tokenService } from "../../services/token/tokenService";
import nookies from "nookies";

export async function HttpClient(fetchUrl, fetchOptions = {}){
  const defaultHeaders = fetchOptions.headers || {}
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...defaultHeaders
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

      const isServer = Boolean(fetchOptions?.ctx);
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies['REFRESH_TOKEN_NAME'];

      try {
        //Tentar atualizar os tokens
        const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
          method: isServer ? "PUT" : "GET",
          body: isServer ? { refresh_token: currentRefreshToken } : undefined
        });

        const newAcessToken = refreshResponse.body.data.access_token;
        const newRefreshToken = refreshResponse.body.data.refresh_token;
        
        //Tenta guardar os tokens
        if(isServer) {
          nookies.set(fetchOptions.ctx, "REFRESH_TOKEN_NAME", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            path: "/"
          })
        }
  
        tokenService.saveToken(newAcessToken);
        const retryResponse = await HttpClient(fetchUrl, {
          ...options,
          refresh: false,
          headers: {
            "Authorization": `Bearer ${newAcessToken}`
          }
        })
        console.log(retryResponse, "retryResponse");
        return retryResponse;
      } catch (err) {
        console.error(err);
        return response;
      }
    });
  }
