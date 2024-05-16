import nookies from 'nookies';
import { tokenService } from "../src/services/token/tokenService";

export default function AuthPageSSR(props){
  return (
    <div>
      <h1>
        Auth Page Server Side Rendering
      </h1>
      <pre>
      {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx);
  return {
    props:{
      token: tokenService.getToken(ctx),
    },
  }
}
