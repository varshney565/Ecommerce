/**
 * This file has the logic to process all the incoming requests for the products.
 */

/**
 * export the product schema for doing CRUD operation
 */

const { product } = require("../model");

/**
 * controller for creating a product.
 */
exports.create = (req,res)=>{
    /**
     * Get the req body
     */
    const newProduct = {
        name : req.body.name,
        cost : req.body.cost,
        description : req.body.description,
        categoryId : req.body.categoryId
    }

    /**
     * Creating the product
     */
    product.create(newProduct).then(NewProduct=>{
        console.log(`product : ${NewProduct.name} added successfully`);
        res.status(201).send(NewProduct);
    }).catch(err=>{
        console.log("Error while creating the product");
        res.status(500).send({
            message : err.name || "Some Internal Error"
        });
    });
};

/**
 * controller for fetching all the products or query param(based on name)
 */

exports.findAll = (req,res)=>{
    /**
     * what is the name of the product that needed to be fetched
     */
    const productName = req.query.name;
    let promise;

    if(productName){
        /**
         * if query param is provided
         */
        promise = product.findAll({
            where : {name : productName}
        });
    }else{
        /**
         * Fetch all the products.
         */
        promise = product.findAll();
    }

    /**
     * Fetch the products.
     */
    promise.then(products=>{
        console.log("products fetched successfully");
        res.status(200).send(products);
    }).catch(err=>{
        console.log("Error while fetching all the procuts");
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    });
}

/**
 * controller for deleting a product
 */

exports.destroy = (req,res)=>{
    /**
     * Id of the product which needed to be deleted.
     */
    const ProductId = req.params.id;
    /**
     * deleting the product
     */
    product.destroy({
        where : {
            id : ProductId
        }
    }).then(Status=>{
        console.log(`product with id : ${ProductId} deleted successfully`);
        res.status(200).send({
            message : `product with id : ${ProductId} deleted successfully`
        });
    }).catch(err=>{
        console.log("Eror while deleting the product");
        res.status(500).send({
            message : err.name  || "Internal Error"
        });
    });
};

/**
 * controller for updating a product
 */

exports.update = (req,res)=>{
    /**
     * Id of the product which needed to be updated.
     */
    const ProductId = req.params.id;

    /**
     * Get the req body
     */
    const newProduct = {
        name : req.body.name,
        cost : req.body.cost,
        description : req.body.description,
        categoryId : req.body.categoryId
    }
    /**
     * updating the product
     */
    product.update(newProduct,{
        where : {
            id : ProductId
        },
        returning : true
    }).then(Status=>{
        //updation successful
        //returning the product object.
        return product.findByPk(ProductId);
    }).then((product)=>{
        console.log(`product with id : ${ProductId} updated successfully`);
        res.status(200).send(product);
    }).catch(err=>{
        console.log(err);
        console.log("error while updating the product");
        res.status(500).send({
            message : err.name || "Some Internal Error"
        });
    });
}

/**
 * controller for getting a product based on id
 */

exports.findOne = (req,res)=>{
    /**
     * getting the product id from path params witch needed to be fetched.
     */
    const ProductId = req.params.id;
    /**
     * Fetching the prouct.
     */
    product.findByPk(ProductId).then(Product=>{
        console.log(`product with id : ${ProductId} fetched successfully`);
        res.status(200).send(Product);
    }).catch(err=>{
        console.log("Error while fetching the prodcut");
        res.status(500).send({
            message : err.name || "Some Internal Error"
        });
    });
};

