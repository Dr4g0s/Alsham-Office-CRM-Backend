const User = require("../../users/model/user.model");
const Customer = require("../../customers/model/customer.model");
const Service = require("../../services/model/service.model");
const Transaction = require("../model/transaction.model");
const { Op , Sequelize} = require("sequelize");
const { StatusCodes } = require("http-status-codes");



const getAllTransactions=async(req,res)=>{
    const indexInputs =  req.body ;
    const filterObj = {
        where: {company_id:req.loginData.company_id},
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

    try {
        var transactions=await Transaction.findAndCountAll({
            ...filterObj
            ,include:[ {model:User,attributes: ['name', "id"]},
                        {model:Customer,attributes: ['name', "id"]},
                        {model:Service,attributes: ['name', "id","desc"]}
                    ]
        })
       console.log(filterObj.where);
        var transactionsInfo=await Transaction.findAll({
          where: filterObj.where
            ,attributes: [ 
                [
                // Sequelize.fn('sum', Sequelize.col('profite')), 'total profite'
                Sequelize.fn(
                          'SUM',
                          Sequelize.where(Sequelize.col('profite'), '*', Sequelize.col('quantity'))
                        ),
                        'total_profite',
                ],
                [
                    Sequelize.fn(
                              'SUM',
                              Sequelize.where(Sequelize.col('paymentAmount'), '+', Sequelize.col('balanceDue'))
                            ),
                            'total_price',
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'paymentAmount'
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('balanceDue')), 'balanceDue'
                ]
            ],
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactions,allProfite:transactionsInfo})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const addTransaction=async (req,res)=>{ 
    try{
        if ((req.body.paymentAmount + req.body.balanceDue) == ((req.body.price + req.body.profite)*req.body.quantity)) {
            var transaction = await Transaction.create(req.body);
            res.status(StatusCodes.CREATED).json({message:"success",result:transaction})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
        }
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const updateTransaction= async (req,res)=>{
    try{
        const id =req.params.id
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 

            if ((req.body.paymentAmount + req.body.balanceDue) == ((req.body.price + req.body.profite)*req.body.quantity)) {

                var transactionUpdated =await Transaction.update(req.body,{where:{id}})
                res.status(StatusCodes.OK).json({message:"success",result:transactionUpdated})
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
            }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    }
}

const deleteTransaction= async (req,res)=>{
   try {
        const id=req.params.id ;
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 

        var transactioDeleted =await Transaction.update({active:false},{
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactioDeleted})
   } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
   }
}

module.exports={getAllTransactions , addTransaction , updateTransaction , deleteTransaction}


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