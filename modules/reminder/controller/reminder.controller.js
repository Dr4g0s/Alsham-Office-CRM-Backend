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
    res.status(StatusCodes.OK).json({ message: "success", result: {old:reminders,new:updatedReminders} })
})

const addReminder=catchAsyncError(async (req,res,next)=>{ 
            console.log(req.body);
            var reminder = await Reminder.create(req.body);
            res.status(StatusCodes.CREATED).json({message:"success",result:reminder})
})

module.exports = { getAllReminders , addReminder}