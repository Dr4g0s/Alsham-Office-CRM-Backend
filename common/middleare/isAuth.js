const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports = ()=>{
    return (req,res,next)=>{
        console.log(req.headers.authorization);  
        const token= req.headers.authorization.split(" ")[1]
        const {id,role}=jwt.verify(token,'alsham2332')
        req.id=id ;
        req.role=role
        console.log(req.id,req.role);
        next()     
    }
}