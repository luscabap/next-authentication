import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

function useSession(){
  const [session, setSession] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then((session) => {
        setSession(session);
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setloading(false);
      })
  }, [])

  return {
    data: {
      session
    },
    error,
    loading
  }
}

function withSessionHOC(Component){
  return function Wrapper(props){
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) {
      router.push("/?error=401");
    }

    const modifiedProps = {
      ...props,
      session: session.data.session
    }

      return (
        <Component {...modifiedProps} />
      )
  }
}

function AuthPageStatic(props){

  return (
    <div>
      <h1>
        Auth Page Static
      </h1>
      <pre>
      {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  )
}

export default withSessionHOC(AuthPageStatic)
