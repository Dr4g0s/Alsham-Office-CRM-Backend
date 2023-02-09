const express= require("express");
require("dotenv").config();
const createTable = require("./modules");
const Customer = require("./modules/customers/model/customer.model");
const customersRoutes = require("./modules/customers/routes/customer.routes");
const servicesRoutes = require("./modules/services/routes/service.routes");
const transactionsRoutes = require("./modules/transactions/routes/transaction.routes");
const User = require("./modules/users/model/user.model");
const userRoutes = require("./modules/users/routes/user.routes");
const cookieParser=require('cookie-parser');
const companyRoutes = require("./modules/companies/routes/company.routes");
const Company = require("./modules/companies/model/company.model");
const Transaction = require("./modules/transactions/model/transaction.model");
const Service = require("./modules/services/model/service.model");

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
    Company.hasMany(User,{
        foreignKey : 'company_id'
    })
    Company.hasMany(Transaction,{
        foreignKey : 'company_id'
    })
    Transaction.belongsTo(User, {
        foreignKey: 'admin_id',
      });
      Transaction.belongsTo(Customer, {
        foreignKey: 'customer_id',
      });
      Transaction.belongsTo(Service, {
        foreignKey: 'service_id',
      });
 
app.use(cookieParser());
createTable();
const port=process.env.PORT ;
app.use(userRoutes);
app.use(customersRoutes);
app.use(servicesRoutes);
app.use(transactionsRoutes);
app.use(companyRoutes)

// global error handling middleware
app.use((error , req ,res , next)=>{
    res.status(400).json({err:'error',error})
})
app.listen(port, () => {   
    console.log(`Server started on port ${port}`);
});
     
  






