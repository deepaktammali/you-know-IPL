import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";

function handler(req, res: NextApiResponse) {
  const user = req.session.get("user");
  res.send({ user });
}

export default withIronSession(handler, {
    password: process.env.SECRET_STRING_IRON_SESSION,
    cookieName:'cookie',
    cookieOptions:{
        secure: process.env.NODE_ENV==="production"
    }
});
