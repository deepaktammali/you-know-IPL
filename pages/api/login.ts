import {withIronSession} from 'next-iron-session';

const handler = async (req,res)=>{

    const name = req.body.name;

    req.session.set("user",{
        name
    });

    await req.session.save();
    res.status(201).send("Logged In");
};


export default withIronSession(handler,{
    password: process.env.SECRET_STRING_IRON_SESSION,
    cookieName:'cookie',
    cookieOptions:{
        secure: process.env.NODE_ENV==="production"
    }
})