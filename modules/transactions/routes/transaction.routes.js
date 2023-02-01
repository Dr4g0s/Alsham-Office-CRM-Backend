const { addTransaction,getAllTransactions, updateTransaction } = require('../controller/transaction.controller')

const transactionsRoutes=require('express').Router()

transactionsRoutes.get('/allTransactions',getAllTransactions) 
transactionsRoutes.post('/addTransaction',addTransaction)
transactionsRoutes.put('/updateTransaction/:id',updateTransaction)
// transactionsRoutes.delete('/deleteTransaction/:id',deleteTransaction)
// transactionsRoutes.get('/searchTransaction',searchTransactions)

module.exports=transactionsRoutes;