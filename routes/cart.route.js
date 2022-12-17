/**
 * router for cart requests
 */

const { create , update , findOne } = require("../controller/cart.controller");
const { verifyToken } = require("../middleware");
const { cartRequestValidator , productIdChecker } = require("../middleware");

module.exports = (app)=>{
    /**
     * route for creating a cart
     */
    app.post("/ecom/api/v1/carts", [verifyToken] , create);
    /**
     * route for updating a cart
     */
    app.put("/ecom/api/v1/carts/:id", [verifyToken , cartRequestValidator , productIdChecker] , update);
    /**
     * route for getting a cart based on cart Id
     */
    app.get("/ecom/api/v1/carts/:id", [verifyToken , cartRequestValidator] , findOne);
};