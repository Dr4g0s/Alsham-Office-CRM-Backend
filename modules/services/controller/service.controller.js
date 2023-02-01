const Service = require("../model/service.model");

const getAllservices=async(req,res)=>{
    var services=await Service.findAndCountAll()
    res.json({message:"success",result:services})
}

const addService=async (req,res)=>{
    var service = await Service.create(req.body);
    res.json({message:"success",result:service})
}

const updateService= async (req,res)=>{
    const id =req.params.id
    var service =await Service.update(req.body,{where:{id}})
    res.json({message:"success",result:service})
}

const deleteService= async (req,res)=>{
    const id=req.params.id ;
    var service =await Service.destroy({
        where :{
            id
        },
    })
    res.json({message:"success",result:service})
}

// search
const searchservices=async(req,res)=>{
    let {searchKey}=req.query;
    if(searchKey){
      let services= await Service.findAll({where:{name:{[Op.like]: `%${searchKey}%`}}});
        res.json({message:"success",services})
    }else{
       let services= await Customer.findAll({});
       res.json({message:"success",services})
    }
}



module.exports={getAllservices , addService , deleteService ,searchservices , updateService}