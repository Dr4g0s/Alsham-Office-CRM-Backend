const { addService,deleteService,getAllservices,searchservices,updateService} = require('../controller/service.controller')

const servicesRoutes=require('express').Router()

servicesRoutes.get('/allservices',getAllservices)
servicesRoutes.post('/addservice',addService)
servicesRoutes.put('/updateservice/:id',updateService)
servicesRoutes.delete('/deleteservice/:id',deleteService)
servicesRoutes.get('/searchservice',searchservices)

module.exports=servicesRoutes;