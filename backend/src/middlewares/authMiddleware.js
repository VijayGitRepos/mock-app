import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(!token){
            res.status(401).json({message:'No token. Access Denied'})
        }else{
            try {
                const decode = jwt.verify(token,process.env.JWT_SECRET);
                // console.log('Auth Token Expire message', decode);
                next();
            } catch (error) {
                res.status(400).json({message:'Invalid Token',error})
            }
            
        }
    }else{
        res.status(400).json({message:'No token available. Access denied'})
    }
}