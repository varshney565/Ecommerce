/**
 * This file wil have the logic to validate the incoming request for products
 */

const {category,product} = require('../model');

exports.validateProductRequest = (req,res,next)=>{
    if(!req.body.name){
        console.log("Name field of product can't be empty");
        res.status(400).send({
            message : "Name field of product can't be empty"
        });
        return;
    }

    if(!req.body.description){
        console.log("Description field of product can't be empty");
        res.status(400).send({
            message : "Description field of product can't be empty"
        });
        return;
    }

    
    if(req.body.cost <= 0){
        console.log("Cost of the product should have some positive value");
        res.status(400).send({
            message : "Cost of the product should be some positive value"
        });
        return;
    }

    const categoryId = req.body.categoryId;
    if(!categoryId){
        console.log("categoryId Not provided.");
        res.status(400).send({
            message : "CategoryId not provided"
        });
        return;
    }

    category.findByPk(categoryId).then(Category=>{
        if(!Category){
            console.log("No such category exists");
            res.status(400).send({
                message : "No such category exists"
            });
            return;
        }
        /**
         * pass the controller to next middleware
         */
        next();
    }).catch(err=>{
        console.log("Error while validating the categoryId");
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    });
};

exports.validateProductId = async (req,res,next)=>{
    const productId = req.params.id;
    try{
        const Product = await product.findByPk(productId);
        if(!Product){
            console.log(`No such product with id : ${productId}`);
            res.status(400).send({
                message : `No such product with id : ${productId}`
            });
            return;
        }
        /**
         * passing the control to next middleware.
         */
        next();
    }catch(err){
        console.log(`error while validating the product with Id : ${productId}`);
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    };
};