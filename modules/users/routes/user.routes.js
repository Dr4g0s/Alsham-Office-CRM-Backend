const userRoutes= require("express").Router();

const { getAllUsers, deleteUser, updateUser, addUser, getSingleUser, search, getUser2030 } = require("../controllers/user.controller");



userRoutes.get("/allUsers",getAllUsers);
userRoutes.delete('/deleteUser/:id',deleteUser);
userRoutes.put('/updateUser/:id',updateUser);
userRoutes.post('/addUser',addUser);
userRoutes.get('/getSingleUser/:id',getSingleUser)
userRoutes.get('/searchUser',search)
userRoutes.get('/getUser2030',getUser2030)


module.exports=userRoutes;
