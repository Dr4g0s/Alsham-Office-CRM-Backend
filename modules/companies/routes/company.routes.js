const isAuth = require('../../../common/middleare/isAuth')
const { addcompany ,deletecompany ,getAllcompanys ,searchcompanys ,updatecompany} = require('../controller/company.controller')

const companyRoutes=require('express').Router()

companyRoutes.get('/allcompanies',isAuth('ADMIN'),getAllcompanys)
companyRoutes.post('/addcompany',isAuth('ADMIN'),addcompany)
companyRoutes.put('/updatecompany/:id',isAuth('ADMIN'),updatecompany)
companyRoutes.delete('/deletecompany/:id',isAuth('ADMIN'),deletecompany)
companyRoutes.get('/searchcompany',isAuth('ADMIN'),searchcompanys)

module.exports=companyRoutes;