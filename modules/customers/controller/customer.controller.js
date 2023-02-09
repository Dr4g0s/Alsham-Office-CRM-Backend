const User = require("../../users/model/user.model");
const Customer = require("../model/customer.model");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");

const getAllCustomers=async(req,res,next)=>{
        try{
            var customers=await Customer.findAndCountAll({ where:{company_id:req.loginData.company_id},include:User})
            res.status(StatusCodes.OK).json({message:"success",result:customers})

        } catch (error) {
           next(new AppError('error server ',500))
            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
        }
}

const addCustomer=async (req,res,next)=>{
    try{
        const customer= await  Customer.findOne({where:{name:req.body.name}});
        if (customer) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"name is exit"})
        } else {
        var customercreated = await Customer.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:customercreated})}
    } catch (error) {
       next(new AppError('error server ',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const updateCustomer= async (req,res,next)=>{
    try{
        const id =req.params.id
        var customer =await Customer.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:customer})
    } catch (error) {
       next(new AppError('error server ',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const deleteCustomer= async (req,res,next)=>{
    try{
            const id=req.params.id ;
            var customer =await Customer.destroy({
                where :{
                    id
                },
            })
            res.status(StatusCodes.OK).json({message:"success",result:customer})
        } catch (error) {
           next(new AppError('error server ',500))
            // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
        }
}

// search
const searchCustomers=async(req,res,next)=>{
    try{
        let {searchKey}=req.query;
        if(searchKey){
            let customers= await Customer.findAll({where:{name:{[Op.like]: `%${searchKey}%`,company_id:req.loginData.company_id}}});
            res.status(StatusCodes.OK).json({message:"success",customers})
        }else{
            let customers= await Customer.findAll({});
           res.status(StatusCodes.OK).json({message:"success",customers})
        }
        
    } catch (error) {
       next(new AppError('error server ',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}



module.exports={getAllCustomers , addCustomer , updateCustomer ,deleteCustomer , searchCustomers}