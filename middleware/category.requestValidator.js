/**
 * This file is responsible for validating the request body for category
 */
const {category} = require('../model');

exports.validateCategoryRequest = (req,res,next)=>{
    if(!req.body.name){
        console.log("Name field of category can't be null...");
        res.status(400).send({
            message : "Name field of category can't be null..."
        });
        return;
    }
    if(!req.body.description){
        console.log("Description field of category can't be null....");
        res.status(400).send({
            message : "Description field of category can't be null..."
        });
        return;
    }
    /**
     * pass the control to the next middleWare.
     */
    next();
}

exports.validateCategoryId = async (req,res,next)=>{
    try{
        const response = await category.findByPk(req.params.id);
        if(!response){
            console.log(`No category with id : ${req.params.id} exists`);
            res.status(400).send({
                message : `No category with this id : ${req.params.id}`
            })
            return;
        }
        
        /**
        * pass the control to next middleware.
        */
        next();
    }catch(error){
        console.log(`Error while validating the category with id : ${req.params.id}`);
        res.status(400).send({
            message : error.name || "Internal Error"
        });
    };
    
};