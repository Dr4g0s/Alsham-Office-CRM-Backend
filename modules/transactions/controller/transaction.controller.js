const User = require("../../users/model/user.model");
const Customer = require("../../customers/model/customer.model");
const Service = require("../../services/model/service.model");
const Transaction = require("../model/transaction.model");


const getAllTransactions=async(req,res)=>{
    var transactions=await Transaction.findAndCountAll({
        where:{active:true}
        ,include:[ {model:User,attributes: ['name', "id"]},
                    {model:Customer,attributes: ['name', "id"]},
                    {model:Service,attributes: ['name', "id","desc"]}
                ]
        
    })
    res.json({message:"success",result:transactions})
}

const addTransaction=async (req,res)=>{ 
    var transaction = await Transaction.create(req.body);
    res.json({message:"success",result:transaction})
}

const updateTransaction= async (req,res)=>{
    const id =req.params.id
    var customer =await Transaction.update(req.body,{where:{id}})
    res.json({message:"success",result:customer})
}

const deleteTransaction= async (req,res)=>{
    const id=req.params.id ;
    var customer =await Transaction.update({active:false},{
        where :{
            id
        },
    })
    res.json({message:"success",result:customer})
}

// // search
// const searchTransactions=async(req,res)=>{
//     let {searchKey}=req.query;
//     if(searchKey){
//       let customers= await Transaction.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
//         res.json({message:"success",customers})
//     }else{
//        let customers= await Transaction.findAll({});
//        res.json({message:"success",customers})
//     }
// }



module.exports={getAllTransactions , addTransaction , updateTransaction , deleteTransaction}