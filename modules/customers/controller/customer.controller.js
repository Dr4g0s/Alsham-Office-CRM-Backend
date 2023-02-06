const User = require("../../users/model/user.model");
const Customer = require("../model/customer.model");
const { StatusCodes } = require("http-status-codes");

const getAllCustomers=async(req,res)=>{
        try{
            var customers=await Customer.findAndCountAll({include:User})
            res.status(StatusCodes.OK).json({message:"success",result:customers})

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
        }
}

const addCustomer=async (req,res)=>{
    try{
        const customer= await  Customer.findOne({where:{name:req.body.name}});
        if (customer) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"name is exit"})
        } else {
        var customercreated = await Customer.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:customercreated})}
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const updateCustomer= async (req,res)=>{
    try{
        const id =req.params.id
        var customer =await Customer.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:customer})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const deleteCustomer= async (req,res)=>{
    try{
            const id=req.params.id ;
            var customer =await Customer.destroy({
                where :{
                    id
                },
            })
            res.status(StatusCodes.OK).json({message:"success",result:customer})
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
        }
}

// search
const searchCustomers=async(req,res)=>{
    try{
        let {searchKey}=req.query;
        if(searchKey){
            let customers= await Customer.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
            res.status(StatusCodes.OK).json({message:"success",customers})
        }else{
            let customers= await Customer.findAll({});
           res.status(StatusCodes.OK).json({message:"success",customers})
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}



module.exports={getAllCustomers , addCustomer , updateCustomer ,deleteCustomer , searchCustomers}