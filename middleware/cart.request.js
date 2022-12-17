/**
 * This file will have the logic to process the incoming request and in case some error 
 * termincate the request else pass the control to next middleware.
 */

const { user, cart, role, product } = require("../model");

exports.cartRequestValidator = async (req,res,next)=>{
    try{
        const userId = req.userId;
        const cartId = req.params.id;
        //check whether user is accessing its own card or not
        //or admin user

        //checking whether admin or not.
        const User = await user.findByPk(userId);
        const Roles = await User.getRoles();
        isAdmin = false;
        for(let x of Roles){
            if(x.name == "admin") {
                isAdmin = true;
                break;
            }
        }

        const Cart = await cart.findByPk(cartId);
        if(Cart.userId != userId && !isAdmin){
            res.status(401).send({
                message : "Don't have permissions"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Error while validating the cart-request");
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    }
}

exports.productIdChecker = async (req,res,next)=>{
    //check whether correct products provided or not.
    if(!req.body.productIds || req.body.productIds.length == 0){
        console.log("No product provided..");
        res.status(403).send({
            message : "No product provided"
        });
        return;
    }

    for(let x of req.body.productIds){
        let Product = await product.findByPk(x);
        if(!Product){
            console.log(`No such product with id : ${ x }`);
            res.status(404).send({
                message : `No such product with id : ${ x }`
            });
            return;
        }
    }
    next();
}