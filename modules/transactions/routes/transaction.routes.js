const isAuth = require('../../../common/middleare/isAuth')
const { addTransaction,getAllTransactions, updateTransaction } = require('../controller/transaction.controller')
const transactionsRoutes=require('express').Router()

transactionsRoutes.post('/allTransactions',isAuth('ALL'),getAllTransactions) 
transactionsRoutes.post('/addTransaction',isAuth('ALL'),addTransaction)
transactionsRoutes.put('/updateTransaction/:id',isAuth('ALL'),updateTransaction)
// transactionsRoutes.delete('/deleteTransaction/:id',deleteTransaction)
// transactionsRoutes.get('/searchTransaction',searchTransactions)

module.exports=transactionsRoutes;