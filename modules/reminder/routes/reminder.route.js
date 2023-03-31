const isAuth = require('../../../common/middleare/isAuth')
const validationRequest = require('../../../common/middleare/validationRequest')
const { getAllReminders, addReminder, updateReminder, deleteReminder } = require('../controller/reminder.controller')
const { getAllReminder, addReminderSchema, updateReminderSchema } = require('../joi/reminder.validation')
const remindersRoutes=require('express').Router()

remindersRoutes.post('/allReminders',validationRequest(getAllReminder),getAllReminders) 
remindersRoutes.post('/addReminder',validationRequest(addReminderSchema),addReminder)
remindersRoutes.put('/updateReminder/:id',validationRequest(updateReminderSchema),updateReminder)
remindersRoutes.delete('/deleteReminder/:id',deleteReminder)
// remindersRoutes.patch('/deleteTransactionSoft/:id',isAuth('ALL'),deleteTransaction)
// remindersRoutes.get('/searchTransaction',searchTransactions)

module.exports=remindersRoutes;