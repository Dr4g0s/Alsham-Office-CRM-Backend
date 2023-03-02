const User = require("../../users/model/user.model");
const Customer = require("../../customers/model/customer.model");
const Service = require("../../services/model/service.model");
const Transaction = require("../model/transaction.model");
const { Op , Sequelize} = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");



const getAllTransactions=catchAsyncError(async(req,res,next)=>{
    const indexInputs =  req.body ;
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) { 
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    
    filterObj.where['company_id'] =req.loginData.company_id
    // if (indexInputs.orderBy) {
        filterObj['order'] = [
            [indexInputs?.orderBy?.coulmn|| 'createdAt', indexInputs?.orderBy?.type || 'DESC'],
        ];
    // }
    if(indexInputs.customer_id !=undefined){
        filterObj.where.customer_id = indexInputs.customer_id 
    }
    if(indexInputs.admin_id !=undefined){
        filterObj.where.admin_id = indexInputs.admin_id 
    }
    var startedDate=indexInputs.startedDate? new Date(indexInputs.startedDate) : new Date("2020-12-12 00:00:00");
    // date.setHours(date.getHours() + hours)
    let date=new Date(indexInputs.endDate)
    var  endDate=indexInputs.endDate? date.setHours(date.getHours() + 24) : new Date();
    if(indexInputs.startedDate || indexInputs.endDate){
        filterObj.where["createdAt"] ={
             [Op.between] : [startedDate , endDate]
        }   
    }
    if (indexInputs.active ==true ||indexInputs.active ==false ) {
        filterObj.where.active = indexInputs.active ;
    }
    if (indexInputs.balanceDue ) {
        filterObj.where.balanceDue = {[Op.gte] :indexInputs.balanceDue} ;
    }

    // try {
        console.log(filterObj.where);
        var transactions=await Transaction.findAndCountAll({
            ...filterObj
            ,include:[ {model:User,attributes: ['name', "id"]},
                        {model:Customer,attributes: ['name', "id"]},
                        {model:Service,attributes: ['name', "id","desc"]}
                    ]
        })
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
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity'
                ],
                [
                    Sequelize.fn(
                        'SUM',
                              Sequelize.where(Sequelize.col('price'), '*', Sequelize.col('quantity'))
                            ),
                            'total_price_without_profite'
                ]
            ],
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactions,allProfite:transactionsInfo})
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const addTransaction=catchAsyncError(async (req,res,next)=>{ 
    // try{
        if ((req.body.paymentAmount + req.body.balanceDue) == ((req.body.price + req.body.profite)*req.body.quantity)) {
            
            var transaction = await Transaction.create(req.body);
            res.status(StatusCodes.CREATED).json({message:"success",result:transaction})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
        }
        
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const updateTransaction= catchAsyncError(async (req,res,next)=>{
    // try{
        const id =req.params.id
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            next(new AppError("this id not valid",400))
            // res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 

            if ((req.body.paymentAmount + req.body.balanceDue) == ((req.body.price + req.body.profite)*req.body.quantity)) {

                var transactionUpdated =await Transaction.update(req.body,{where:{id}})
                res.status(StatusCodes.OK).json({message:"success",result:transactionUpdated})
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
            }
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const deleteTransaction= catchAsyncError(async (req,res,next)=>{
//    try {
        const id=req.params.id ;
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            next(new AppError("this id not valid",400))
            // res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 

        var transactioDeleted =await Transaction.update({active:false},{
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactioDeleted})
//    } catch (error) {
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
//    }
})

module.exports={getAllTransactions , addTransaction , updateTransaction , deleteTransaction}
