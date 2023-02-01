const { getAllCustomers, addCustomer, updateCustomer, deleteCustomer, searchCustomers } = require('../controller/customer.controller')

const customersRoutes=require('express').Router()

customersRoutes.get('/allcustomers',getAllCustomers) 
customersRoutes.post('/addCustomer',addCustomer)
customersRoutes.put('/updateCustomer/:id',updateCustomer)
customersRoutes.delete('/deleteCustomer/:id',deleteCustomer)
customersRoutes.get('/searchCustomer',searchCustomers)

module.exports=customersRoutes;