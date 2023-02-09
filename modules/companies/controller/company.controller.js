const Company = require("../model/company.model");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");

const getAllcompanys=async(req,res,next)=>{
    try {
        var companys=await Company.findAndCountAll()
        res.status(StatusCodes.OK).json({message:"success",result:companys})
        
    } catch (error) {
       next( new AppError('server Error',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const addcompany=async (req,res,next)=>{
    try {
        var company = await Company.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:company})
    } catch (error) {
       next( new AppError('server Error',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const updatecompany= async (req,res,next)=>{
    try {
        const id =req.params.id
        var company =await Company.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:company})
    } catch (error) {
       next( new AppError('server Error',500))
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
    
}

const deletecompany= async (req,res,next)=>{
   try {
        const id=req.params.id ;
        var company =await Company.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:company})
   } catch (error) {
    next( new AppError('server Error',500))   
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
   }
}

// search
const searchcompanys=async(req,res,next)=>{
    try {
            let {searchKey}=req.query;
            if(searchKey){
            let companys= await Company.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
                res.status(StatusCodes.OK).json({message:"success",companys})
            }else{
            let companys= await Customer.findAll({});
            res.status(StatusCodes.OK).json({message:"success",companys})
            }
    } catch (error) {
        next( new AppError('server Error',500))   
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}



module.exports={getAllcompanys , addcompany , deletecompany ,searchcompanys , updatecompany}