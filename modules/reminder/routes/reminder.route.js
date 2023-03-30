const isAuth = require('../../../common/middleare/isAuth')
const validationRequest = require('../../../common/middleare/validationRequest')
const { getAllReminders } = require('../controller/reminder.controller')
const { getAllReminder, addReminderSchema } = require('../joi/reminder.validation')
const remindersRoutes=require('express').Router()

remindersRoutes.post('/allReminders',validationRequest(getAllReminder),getAllReminders) 
// remindersRoutes.post('/addReminder',isAuth('ALL'),validationRequest(addReminderSchema),)
// remindersRoutes.put('/updateTransaction/:id',isAuth('ALL'),validationRequest(updateTransactionSchema),updateTransaction)
// remindersRoutes.patch('/deleteTransactionSoft/:id',isAuth('ALL'),deleteTransaction)
// remindersRoutes.get('/searchTransaction',searchTransactions)

module.exports=remindersRoutes;