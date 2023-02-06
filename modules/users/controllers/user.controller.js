const User = require("../model/user.model");
const {Op}=require("sequelize");
const Customer = require("../../customers/model/customer.model");
const bcrypt = require('bcrypt')
const { StatusCodes } = require("http-status-codes");


// get all users
const getAllUsers=async(req,res)=>{
    try {
        const users=await  User.findAndCountAll({include:Customer});
        res.status(StatusCodes.OK).json({message:"succes",users})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }

}

// delete  user
const deleteUser=async(req,res)=>{
   try{
        let id=req.params.id
        await User.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

// add user
const addUser=async(req,res)=>{
    const {password} = req.body
    try {
        const user= await  User.findOne({where:{email:req.body.email}});
        if (user) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"email is exit"})
        } else {
            bcrypt.hash(password,7, async (err,hash)=>{
                if(err) throw err
        
                var result= await User.create({...req.body , password:hash})
                 res.status(StatusCodes.CREATED).json({message:"success",result})
            })
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

// update user
const updateUser=async(req,res)=>{
   try {
        let id=req.params.id;
        let {name}=req.body;
        await User.update({name},{where:{id}})
        res.status(StatusCodes.OK).json({message:"success"})
   } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    
   }
}

// get single user
const getSingleUser=async(req,res)=>{
    try {
        let id=req.params.id;
        let user=await User.findOne({where:{id}});
        res.status(StatusCodes.OK).json({message:"success",user});
   } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
   }
   
}
// search
const search=async(req,res)=>{
    try{
        let {searchKey}=req.query;
        if(searchKey){
          let users= await User.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
            res.status(StatusCodes.OK).json({message:"success",users})
        }else{
           let users= await User.findAll({});
           res.status(StatusCodes.OK).json({message:"success",users})
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }

}

module.exports={getAllUsers,deleteUser,addUser,updateUser,getSingleUser,search}