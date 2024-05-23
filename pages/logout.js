import { useRouter } from "next/router";
import { tokenService } from "../src/services/token/tokenService"
import { useEffect } from "react";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";

export default function LogoutPage(){
  const router = useRouter();

  useEffect(async () => {
    try {
      await HttpClient('/api/refresh', {
        method: "DELETE"
      })
      tokenService.deleteToken();
      setTimeout(() => {
        router.push("/");
      }, 1000)
    } catch (err) {
      console.error(err);
      alert(err.message)
    }
  })

  return (
    <div>
      Você será redirecinado em instantes...
    </div>
  )
}
