/**
 * This file is responsible for routing the incoming request to the correct controller method.
 */

const {create, findOne, update, destroy, findAll} = require('../controller/category.controller');
const {validateCategoryRequest,validateCategoryId,verifyToken, isAdmin} = require('../middleware');

module.exports = (app)=>{
    //route for fetching all the categories
    app.get("/ecom/api/v1/categories", [ ] , findAll);
    //route for creating a new category
    app.post("/ecom/api/v1/categories", [ verifyToken , isAdmin , validateCategoryRequest ] , create);
    //route for fetching a category with id
    app.get("/ecom/api/v1/categories/:id", [ validateCategoryId ] , findOne);
    //route for deleting a category
    app.delete("/ecom/api/v1/categories/:id" , [ verifyToken , isAdmin , validateCategoryId ] , destroy);
    //route for updating a category
    app.put("/ecom/api/v1/categories/:id", [ verifyToken , isAdmin , validateCategoryId , validateCategoryRequest ] , update);
    //route for getting a category based on name
    app.get("/ecom/api/v1/categories/?name" , findAll);
};

