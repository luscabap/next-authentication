import Link from "next/link"
import { withSessionHOC } from "../src/services/auth/session"

function AuthPageStatic(props){
  return (
    <div>
      <h1>
        Auth Page Static
      </h1>
      <Link href="/logout">Logout</Link>
      <pre>
      {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  )
}

export default withSessionHOC(AuthPageStatic)
