/**
 * This file is responsible for routing the incoming request to the correct controller method for products
 */



const { update , destroy , create , findOne , findAll } = require("../controller/product.controller");
const { validateProductRequest , validateProductId , verifyToken , isAdmin } = require('../middleware');

module.exports = (app)=>{
    //route for getting all the products
    app.get("/ecom/api/v1/products", [ ] , findAll);
    //route for getting the product based on id
    app.get("/ecom/api/v1/products/:id", [ validateProductId ] , findOne);
    //route for getting the product based on name
    app.get("/ecom/api/v1/products/?name", [ ] , findAll);
    //route for creating the product
    app.post("/ecom/api/v1/products", [ verifyToken , isAdmin , validateProductRequest ] , create);
    //route for updating the product
    app.put("/ecom/api/v1/products/:id", [ verifyToken , isAdmin , validateProductId , validateProductRequest ] , update);
    //route for deleting the product
    app.delete("/ecom/api/v1/products/:id", [ verifyToken , isAdmin , validateProductId ] , destroy);
}

