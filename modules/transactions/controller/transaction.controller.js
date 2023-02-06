const User = require("../../users/model/user.model");
const Customer = require("../../customers/model/customer.model");
const Service = require("../../services/model/service.model");
const Transaction = require("../model/transaction.model");
const { Op , Sequelize} = require("sequelize");

/*const getAllMainFields = async (req, res) => {
    const { body } = req
    const indexInputs = await global.helpers.validateInputs.validate(res, indexSchema, body);
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) {
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    if (indexInputs.orderBy) {
        filterObj['order'] = [
            [indexInputs.orderBy.coulmn, indexInputs.orderBy.type],
        ];
    }
    if(indexInputs.active !=undefined){
        filterObj.where.active = indexInputs.active 
    }
    if (indexInputs.search) {
        filterObj.where[Op.or] =[
                        {nameEn: { [Op.like]: `%${indexInputs.search}%` }},
                        {name: { [Op.like]: `%${indexInputs.search}%` }}
                        ]
    }
            const where = {
            from: {
                $between: [startDate, endDate]
            }
        }

       var startedDate= new Date("2020-12-12 00:00:00");
       var  endDate= new Date("2020-12-26 00:00:00");
    if(indexInputs.date){
         filterObj.where[createdAt] ={
            [Op.between] : [startedDate , endDate ]
         }
    }

    const mainFields = await global.db.main_field.findAndCountAll(filterObj);
    return appConfig.send(res, 'ok', mainFields);
} 
{"limit":2,"offset":0,"customer_id":1,"admin_id":1} */

const getAllTransactions=async(req,res)=>{
    const indexInputs =  req.body ;
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) { 
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    if (indexInputs.orderBy) {
        filterObj['order'] = [
            [indexInputs.orderBy.coulmn, indexInputs.orderBy.type],
        ];
    }
    if(indexInputs.customer_id !=undefined){
        console.log("teeeeeeeeeestbjhsbk shd sdh" ,indexInputs.customer_id );
        filterObj.where.customer_id = indexInputs.customer_id 
    }
    if(indexInputs.admin_id !=undefined){
        filterObj.where.admin_id = indexInputs.admin_id 
    }
    var startedDate=indexInputs.startedDate? new Date(indexInputs.startedDate) : new Date("2020-12-12 00:00:00");
    var  endDate=indexInputs.endDate? indexInputs.endDate : new Date();
    if(indexInputs.date){
        filterObj.where["createdAt"] ={
             [Op.between] : [startedDate , endDate ]
        }   
    }
 
    filterObj.where.active = indexInputs.active? indexInputs.active : true
    var transactions=await Transaction.findAndCountAll({
        ...filterObj
        ,include:[ {model:User,attributes: ['name', "id"]},
                    {model:Customer,attributes: ['name', "id"]},
                    {model:Service,attributes: ['name', "id","desc"]}
                ]
        // , attributes: [[Sequelize.fn('min', Sequelize.col('price')), 'minPrice']],
        // ,attributes: [ [Sequelize.fn('sum', Sequelize.col('profite')), 'total profite']],
        // group : ['Transaction.customer_id'],
        // group : ['Transaction.active'],
        // raw: true,
        // order: Sequelize.literal('total DESC')
               
        
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