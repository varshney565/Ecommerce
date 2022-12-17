/**
 * Handler for signup and signin
 */

const {signup,signin} = require("../controller/auth.controller");
const { signupRequestValidator, signinRequestValidator } = require("../middleware");

module.exports = (app)=>{
    //route for signup
    app.post("/ecom/api/v1/auth/signup",[signupRequestValidator],signup);
    //route for signin
    app.post("/ecom/api/v1/auth/signin",[signinRequestValidator],signin);
}