const Reminder = require("../model/reminder.model");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const { Op, Sequelize } = require("sequelize");
const Service = require("../../services/model/service.model");

const getAllReminders = catchAsyncError(async (req, res, next) => {
    const indexInputs = req.body;
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) {
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    filterObj['order'] = [
        [indexInputs?.orderBy?.coulmn || 'dateExpire', indexInputs?.orderBy?.type || 'DESC'],
    ];
    var dateExpire=indexInputs?.dateExpire ? new Date(indexInputs?.dateExpire) : new Date();
    var date2=new Date()
    // let date=new Date(indexInputs.dateExpire);
    // var  endDate=date.setHours(date.getHours() + 23) ;
    // if(indexInputs.dateExpire ){
        filterObj.where["dateExpire"] ={
             [Op.between] : [dateExpire , dateExpire]
        }
    // }
    const reminders = await Reminder.findAll(
        { ...filterObj
            ,include:[{model:Service,attributes: ['name', "id"]},] 
            }
    );

    if (dateExpire.getFullYear() === date2.getFullYear()
        && dateExpire.getMonth() === date2.getMonth()
        && dateExpire.getDate() === date2.getDate()) {
        console.log('The two dates are on the same day.');
            await Reminder.update({ status:'pending' }, { where:
                {
            dateExpire: {
                [Op.between]: [dateExpire, dateExpire],
                        }
            }
            });
        } else {
            console.log('The two dates are not on the same day.');
        }

    filterObj.where={ [Op.or]:[ 
    {dateExpire: { [Op.between]: [dateExpire, dateExpire]  }},
    {status : 'pending'}
                ]}


    const updatedReminders = await Reminder.findAndCountAll({...filterObj
        ,include:[{model:Service,attributes: ['name', "id"]},]});
    // test whats app message
    // var unirest = require("unirest");

    // var req = unirest("GET", "https://www.replier.net/sendMessage/");

    // req.query({
    // "instanceid": "132187",
    // "token": "1fe076a5-4f59-469a-93cc-4dcfe7b348ac",
    // "phone": "971568140062",
    // "body": "hello zezo"
    // });


    // req.end(function (res) {
    // if (res.error) throw new Error(res.error);

    // console.log(res);
    // });   

    res.status(StatusCodes.OK).json({ message: "success", result:updatedReminders })
})

const addReminder=catchAsyncError(async (req,res,next)=>{ 
            console.log(req.body);
            var reminder = await Reminder.create(req.body);
            res.status(StatusCodes.CREATED).json({message:"success",result:reminder})
})

const updateReminder=catchAsyncError( async(req, res , next)=>{
    const {id} =req.params ;
    var {message,dateExpire,status}=req.body ;
    const oldReminder=await Reminder.findOne({where:{id}})
    if (oldReminder) {
        if (dateExpire) {
            dateExpire=new Date(dateExpire);
        }
        const oldExpireDate=new Date(oldReminder.dateExpire)
        if (!(dateExpire.getFullYear() === oldExpireDate.getFullYear()
        && dateExpire.getMonth() === oldExpireDate.getMonth()
        && dateExpire.getDate() === oldExpireDate.getDate())) {
            console.log('The two dates are on NOT the same day.');
            await Reminder.update({ status:'new' }, { where:{ id} });
        }

        var reminderUpdated =await Reminder.update({message,dateExpire,status},{where:{id}}) ;
        res.status(StatusCodes.OK).json({message:"success",result:reminderUpdated})
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({message:"reminder is not exit"}) 
    }
})

module.exports = { getAllReminders , addReminder , updateReminder}