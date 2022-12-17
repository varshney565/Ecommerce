/**
 * Logic to validate the access token.
 * authentication.
 */

const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");
const { user } = require("../model");

exports.verifyToken = (req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        console.log("No token provided");
        res.status(400).send({
            message : "No token provided"
        });
        return;
    }

    //check the token is valid or not.
    jwt.verify(token,secret,(err,decodedToken)=>{
        if(err){
            console.log("Unauthorized");
            res.status(401).send({
                message : "Unauthorized"
            });
            return;
        }
        //valid token
        req.userId = decodedToken.id;
        next();
    });
}; 


/**
 * Logic to check whether the user has proper credentials or not
 * Authorization.
 */

exports.isAdmin = async (req,res,next)=>{
    const User = await user.findByPk(req.userId);
    const Roles = await User.getRoles();
    ok = false;
    for(x of Roles){
        if(x.name == 'admin'){
            ok = true;
            break;
        }
    }
    if(!ok){
        console.log("User don't have permissions.");
        res.status(401).send({
            message : "Require Admin Role"
        });
        return;
    }
    next();
}
