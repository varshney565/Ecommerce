/**
 * validator for signup request
 */

const { user , roles } = require("../model");


exports.signupRequestValidator = async (req,res,next)=>{
    /**
     * validator for username
     */
    if(!req.body.username){
        console.log("No username provided");
        res.status(400).send({
            message : "No username provided"
        });
        return;
    }

    let User = await user.findOne({where : {username : req.body.username}});
    if(User){
        console.log("User already exists with that username");
        res.status(400).send({
            message : "User already exists with that username"
        })
        return;
    }
    /**
     * validator for password
     */
    if(req.body.password.length < 5){
        console.log("password is too short..");
        res.status(400).send({
            message : "Password is too short , must have atleast 5 digit"
        });
        return;
    }

    /**
     * validator for email
     */

    if(!req.body.email){
        console.log("No email provided");
        res.status(400).send({
            message : "No email provided"
        });
        return;
    }

    User = await user.findOne({where : {email : req.body.email}});
    if(User){
        console.log("User already exists with that email");
        res.status(400).send({
            message : "User already exists with that email"
        })
        return;
    }

    /**
     * validator for roles
     */

    if(!req.body.roles){
        next();
        return;
    }

    for(x of req.body.roles){
        if(!roles.includes(x)){
            res.status(404).send({
                message : `No role with name : ${x}`
            });
            return;
        }
    }
    next();
};

/**
 * validator for signin request.
 */

exports.signinRequestValidator = async (req,res,next)=>{
    /**
     * validator for email
     * whether user exists or not
     */

    if(!req.body.email){
        console.log("No email provided");
        res.status(400).send({
            message : "No email provided"
        });
        return;
    }

    const User = await user.findOne({where : {email : req.body.email}});
    if(!User){
        console.log("No user with this email");
        res.status(404).send({
            message : "No user with this email,try signing up first.."
        });
        return;
    }
    /**
     * validator for password
     */
    if(req.body.password.length < 5){
        console.log("password is too short..");
        res.status(400).send({
            message : "Password is too short , must have atleast 5 digit"
        });
        return;
    }
    next();
}