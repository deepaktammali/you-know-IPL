import { withIronSession } from "next-iron-session";

function handler(req, res) {
  req.session.destroy();
  res.status(200).send("Logged out");
}

export default withIronSession(handler, {
  password: process.env.SECRET_STRING_IRON_SESSION,
  cookieName:'cookie',
  cookieOptions:{
      secure: process.env.NODE_ENV==="production"
  }
});
