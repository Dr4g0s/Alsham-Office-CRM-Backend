const userRoutes= require("express").Router();
const isAuth = require("../../../common/middleare/isAuth");
const validateRequest=require('../../../common/middleare/validationRequest')
const { getAllUsers, deleteUser, updateUser, addUser, getSingleUser, search, login } = require("../controllers/user.controller");
const { addUserSchema, loginSchema } = require("../joi/user.validation");



userRoutes.get("/allUsers",isAuth('ADMIN'),getAllUsers);
userRoutes.delete('/deleteUser/:id',isAuth('ADMIN'),deleteUser);
userRoutes.put('/updateUser/:id',isAuth('ADMIN'),updateUser);
userRoutes.post('/addUser',validateRequest(addUserSchema),addUser);
userRoutes.get('/getSingleUser/:id',isAuth('ADMIN'),getSingleUser)
userRoutes.get('/searchUser',isAuth('ADMIN'),search)
userRoutes.post('/login',validateRequest(loginSchema),login)


module.exports=userRoutes;
