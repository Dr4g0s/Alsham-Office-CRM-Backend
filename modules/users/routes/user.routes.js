const userRoutes= require("express").Router();
const validateRequest=require('../../../common/validationRequest')
const { getAllUsers, deleteUser, updateUser, addUser, getSingleUser, search, getUser2030 } = require("../controllers/user.controller");
const { addUserSchema } = require("../joi/user.validation");



userRoutes.get("/allUsers",getAllUsers);
userRoutes.delete('/deleteUser/:id',deleteUser);
userRoutes.put('/updateUser/:id',updateUser);
userRoutes.post('/addUser',validateRequest(addUserSchema),addUser);
userRoutes.get('/getSingleUser/:id',getSingleUser)
userRoutes.get('/searchUser',search)


module.exports=userRoutes;
