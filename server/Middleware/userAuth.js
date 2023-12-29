import axios from 'axios'

const isAuthenticated = async(req,res,next) =>{
    try{
    const accessToken = req.cookies;
    console.log(accessToken)
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`)
    const tokeninfo = response.data;
    console.log(tokeninfo)
    if(tokeninfo.aud === process.env.VITE_APP_CLIENT_ID){
        req.user = tokeninfo;
        next();
    }else{
        res.status(401).send("Unauthorized")
    }
    }catch(err){
    res.status(401).send("Unauthorized");
    }
}


export default isAuthenticated;