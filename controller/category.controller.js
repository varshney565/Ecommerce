/**
 * This flle have the logic to process the incoming request.
 */

const { category, product } = require("../model");
const { Sequelize } = require("../model");
const Op = Sequelize.Op;

/**
 * controller for creating the category
 */
exports.create = async (req,res)=>{
    const newCategory = {
        name : req.body.name,
        description : req.body.description
    }

    try{
        const Category = await category.create(newCategory);
        console.log(`category : ${Category.name} added successfully`);
        res.status(201).send(Category);
    }catch(err){
        console.log("Error while creating the category.");
        res.status(500).send({
            message : err.message || "Some internal server Error"
        });
    }
};


/**
 * controller for fetching list of all the categories that are present.
 */
exports.findAll = async (req,res)=>{
    /**
     * if i did't get a query param then no filter,will return all the categories.
     */

    /**
     * name of the category that needed to be fetcched.
     */
    const categoryName = req.query.name;
    let categories;

    try{
        if(categoryName){
            /**
             * fetching the category with given name
             */
            categories = await category.findAll({
                where : {name : categoryName}
            });
        }else{
            /**
             * fetching all the categories
             */
            categories = await category.findAll();
        }
        
        /**
         * fetching the category
         */
        
        console.log("categories fetched successfully..");
        res.status(200).send(categories);
    }catch(err){
        console.log("Error while fetching the categories.");
        res.status(500).send({
            message : err.message || "Some internal server Error"
        });
    }
};


/**
 * controller for fetching a category by its id
 */
exports.findOne = async (req,res)=>{
    const categoryId = req.params.id;
    try{
        const Category = await category.findByPk(categoryId);
        console.log(`category with id : ${categoryId} is ${Category.name}`);
        res.status(200).send(category);
    }catch(err){
        console.log("Error while fetching the categories.");
        res.status(500).send({
            message : err.name || "Some internal server Error"
        });
    }
}

/**
 * controller for updating a category based on id
 */

exports.update = (req,res)=>{

    //id of the category that needed to be updated.
    const categoryId = req.params.id;

    //as i need to update that category,so i need the body with which category will
    //be updated.
    const newCategory = {
        name : req.body.name,
        description : req.body.description
    }

    //time to update the category
    category.update(newCategory,{
        where : {id : categoryId},
        returning : true
    }).then(updatedCategory=>{
        /**
         * [object,status]      object will be undefined because it did't return the actual object
         *                      status will be 0 if there is no such category with that id or some error
         *                      status will be 1 if the category updated successfully.
         */
        //get the updated category
        return category.findByPk(categoryId);
    }).then(category=>{
        console.log(`category with id : ${categoryId} updated successfully`);
        res.status(200).send(category);
    }).catch(err=>{
        console.log("error while updating the category");
        res.status(500).send({
            message : err.name || "Some Internal Error"
        });
    })
};

/**
 * controller for deleting a category
 */

exports.destroy = async (req,res)=>{
    //which category needed to be deleted..
    const categoryId = req.params.id;
    try{
        //delete all those products which has categoryId as req.body.id
        await product.destroy({
            where : {
                categoryId : categoryId
            }
        });

        //delete the category
        const status = await category.destroy({
            where : {id : categoryId}
        })
        /**
         * status 1 : mean category deleted successfully.
         * status 0 : mean no such category exists or some error
         */
        res.status(200).send({
            message :  `category with id : ${categoryId} deleted successfully`
        });
    }catch(err){
        console.log("Error while deleting the category");
        res.status(500).send({
            message : err.name || "Some Internal Error"
        });
    }
};