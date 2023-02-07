const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports = (authRole="ALL")=>{
    return (req,res,next)=>{
        console.log(req.headers.authorization);
        console.log(req.get('authorization'));  
        const token= req.headers.authorization.split(" ")[1]
        if (token) {
            try {
                const {id,role}=jwt.verify(token,'alsham2332')
                if (id) {
                    req.loginData={id,role}
                    if (authRole == "ALL") {
                        next()     
                    } else {
                        role===2 ? next() : res.status(StatusCodes.UNAUTHORIZED).json({message:"Not Authenticated"})
                    }
                } else {
                    res.status(StatusCodes.UNAUTHORIZED).json({message:"Not Authenticated"})
                }
            } catch (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({message:"Not Authenticated"})
        }
    }
}