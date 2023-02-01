const User = require("../model/user.model");
const {Op}=require("sequelize");
const Customer = require("../../customers/model/customer.model");

// get all users
const getAllUsers=async(req,res)=>{
  const users=await  User.findAndCountAll({include:Customer});
  res.json({message:"succes",users})
}

// delete  user
const deleteUser=async(req,res)=>{
    let id=req.params.id
    await User.destroy({
        where :{
            id
        },
    })
    res.json({message:"success"})

}

// add user
const addUser=async(req,res)=>{
   var result= await User.create(req.body)
    res.json({message:"success",result})
}

// update user
const updateUser=async(req,res)=>{
    let id=req.params.id;
    let {name}=req.body;
    await User.update({name},{where:{id}})
    res.json({message:"success"})
}

// const updateUser=async (req,res)=>{

//     await User.update(req.body , {where:{id:req.params.id}})
//     res.json({message:"updated success"})
// }

// get single user
const getSingleUser=async(req,res)=>{
    let id=req.params.id;
   let user=await User.findOne({where:{id}});
   res.json({message:"success",user});
}
// search
const search=async(req,res)=>{
    let {searchKey}=req.query;
    if(searchKey){
      let users= await User.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
        res.json({message:"success",users})
    }else{
       let users= await User.findAll({});
       res.json({message:"success",users})
    }
}
// get user their age between 20 : 30
const getUser2030=async(req,res)=>{

    let users=await User.findAll({
        where:{
            age:{[Op.between]:[20,30]}
        }
    })
    res.json({message:"success",users})
}

module.exports={getAllUsers,deleteUser,addUser,updateUser,getSingleUser,search,getUser2030}