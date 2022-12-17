const express = require("express");
const app = express();
const serverConfig = require('./config/server.config');

const body_parser = require("body-parser");
app.use(body_parser.json());

const db = require("./model");

/**
 * making a db connection and creating the tables in the database.
 */

db.sequelize.sync({force : true}).then(()=>{
    console.log("Database connected with the server");
    init();
}).catch((err)=>{
    console.log(err.message);
});


function init(){
    const categories = [
        {
            name : "Electronics",
            description : "This category has all the electronics items"
        },
        {
            name : "Kitchen",
            description : "This category has all the kitchen items"
        },
        {
            name : "Food",
            description : "This category has all the food items"
        }
    ];
    db.category.bulkCreate(categories).then(categories=>{   
        console.log("categories created successfully");
    }).catch(err=>{
        console.log("Some error while bulk-creating the categories");
    });


    /**
     * create the roles
     */

    db.role.bulkCreate([
        {
            id : 1,
            name : "customer"
        },
        {
            id : 2,
            name : "admin"
        }
    ]).then(roles=>{
        console.log("Roles added successfully in the database");
    }).catch(err=>{
        console.log("some error while adding the roles in the database");
    });
}

/**
 * route for categories
 */
require("./routes/category.route")(app);
/**
 * route for products
 */
require("./routes/product.route")(app);
/**
 * route for signup and signin
 */
require("./routes/auth.route")(app);
/**
 * route for cart
 */
require("./routes/cart.route")(app);

app.listen(process.env.PORT,()=>{
    console.log("Application started running");
});