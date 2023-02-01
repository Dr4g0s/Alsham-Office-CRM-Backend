const User = require("../../users/model/user.model");
const Customer = require("../model/customer.model");

const getAllCustomers=async(req,res)=>{
    var customers=await Customer.findAndCountAll({include:User})
    res.json({message:"success",result:customers})
}

const addCustomer=async (req,res)=>{
    var customer = await Customer.create(req.body);
    res.json({message:"success",result:customer})
}

const updateCustomer= async (req,res)=>{
    const id =req.params.id
    var customer =await Customer.update(req.body,{where:{id}})
    res.json({message:"success",result:customer})
}

const deleteCustomer= async (req,res)=>{
    const id=req.params.id ;
    var customer =await Customer.destroy({
        where :{
            id
        },
    })
    res.json({message:"success",result:customer})
}

// search
const searchCustomers=async(req,res)=>{
    let {searchKey}=req.query;
    if(searchKey){
      let customers= await Customer.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
        res.json({message:"success",customers})
    }else{
       let customers= await Customer.findAll({});
       res.json({message:"success",customers})
    }
}



module.exports={getAllCustomers , addCustomer , updateCustomer ,deleteCustomer , searchCustomers}