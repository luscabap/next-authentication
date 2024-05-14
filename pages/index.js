import { useState } from "react";
import { useRouter } from "next/router";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = useState({
    usuario: 'omariosouto',
    senha: 'safepassword'
  })

  function handleChange(e) {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setValues((currenteValues) => {
      return {
        ...currenteValues,
        [fieldName]: fieldValue
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => {
        e.preventDefault();
        // router.push('/auth-page-ssr');
        router.push('/auth-page-static');
      }}>
        <input
          placeholder="Usuário" name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha" name="senha" type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
