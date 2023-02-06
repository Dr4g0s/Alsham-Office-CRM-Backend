const Service = require("../model/service.model");
const { StatusCodes } = require("http-status-codes");

const getAllservices=async(req,res)=>{
    try {
        var services=await Service.findAndCountAll()
        res.status(StatusCodes.OK).json({message:"success",result:services})
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const addService=async (req,res)=>{
    try {
        var service = await Service.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:service})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const updateService= async (req,res)=>{
    try {
        const id =req.params.id
        var service =await Service.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:service})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
    
}

const deleteService= async (req,res)=>{
   try {
        const id=req.params.id ;
        var service =await Service.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:service})
   } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
   }
}

// search
const searchservices=async(req,res)=>{
    try {
            let {searchKey}=req.query;
            if(searchKey){
            let services= await Service.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
                res.status(StatusCodes.OK).json({message:"success",services})
            }else{
            let services= await Customer.findAll({});
            res.status(StatusCodes.OK).json({message:"success",services})
            }
    } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}



module.exports={getAllservices , addService , deleteService ,searchservices , updateService}