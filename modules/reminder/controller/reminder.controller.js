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
    var reminders = await Reminder.findAndCountAll(
       { ...filterObj
        ,include:[{model:Service,attributes: ['name', "id"]},]
        }
    )
    res.status(StatusCodes.OK).json({ message: "success", result: reminders })
})


module.exports = { getAllReminders }