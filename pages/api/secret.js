import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired((req, res) =>{
  const session = getSession(req, res)
  const user = session.user
})
