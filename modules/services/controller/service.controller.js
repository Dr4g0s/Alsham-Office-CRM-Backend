const Service = require("../model/service.model");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");

const getAllservices=catchAsyncError(async(req,res,next)=>{
    // try {
        var services=await Service.findAndCountAll()
        res.status(StatusCodes.OK).json({message:"success",result:services})
        
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const addService=catchAsyncError(async (req,res,next)=>{
    // try {
        var service = await Service.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:service})
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const updateService= catchAsyncError(async (req,res,next)=>{
    // try {
        const id =req.params?.id
        var service =await Service.update(req.body,{where:{id}})
        if (!service)
        next(new AppError("this id not valid",400))

        res.status(StatusCodes.OK).json({message:"success",result:service})
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
    
})

const deleteService= catchAsyncError(async (req,res,next)=>{
//    try {
        const id=req.params.id ;
        var service =await Service.update(req.body,{where:{id}})
        if (!service)
        next(new AppError("this id not valid",400))

        var service =await Service.destroy({
            where :{
                id
            },
        })
        if (!service)
        next(new AppError("this id not valid",400))

        res.status(StatusCodes.OK).json({message:"success",result:service})
//    } catch (error) {
//     next(new AppError('error server ',500))    
//     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
//    }
})

// search
const searchservices=catchAsyncError(async(req,res,next)=>{
    // try {
            let {searchKey}=req.query;
            if(searchKey){
            let services= await Service.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
                res.status(StatusCodes.OK).json({message:"success",services})
            }else{
            let services= await Customer.findAll({});
            res.status(StatusCodes.OK).json({message:"success",services})
            }
    // } catch (error) {
    //     next(new AppError('error server ',500))    
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})



module.exports={getAllservices , addService , deleteService ,searchservices , updateService}