const express= require("express");
require("dotenv").config();
const createTable = require("./modules");
const Customer = require("./modules/customers/model/customer.model");
const customersRoutes = require("./modules/customers/routes/customer.routes");
const servicesRoutes = require("./modules/services/routes/service.routes");
const transactionsRoutes = require("./modules/transactions/routes/transaction.routes");
const User = require("./modules/users/model/user.model");
const userRoutes = require("./modules/users/routes/user.routes");
const cookieParser=require('cookie-parser')

 const app =express();
app.use(express.json());
// Customer.associate=()=>{
//     Customer.belongsTo(User, {
//         as: 'admin',
//         foreignKey: 'admin_id',
    
//       });

// }
    User.hasMany(Customer,{
        foreignKey :'admin_id'
    })
    app.use(cookieParser());
createTable();
const port=process.env.PORT ;
app.use(userRoutes);
app.use(customersRoutes);
app.use(servicesRoutes);
app.use(transactionsRoutes);
app.listen(port, () => {   
    console.log(`Server started on port ${port}`);
});
  
  






