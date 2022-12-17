/**
 * Logic for creating a cart
 */

const { cart, product } = require("../model")
const { Sequelize } = require("../model");
const Op = Sequelize.Op;
exports.create = (req,res)=>{

    //get the userId from req
    const Cart = {
        userId : req.userId
    }

    cart.create(Cart).then(Cart=>{
        console.log("Cart created successfully");
        res.status(201).send(Cart);
    }).catch(err=>{
        console.log("Error while creating the cart.");
        res.status(500).send({
            message : err.name || "Internal Error"
        });
    })
}

/**
 * Logic for updating a cart
 */

exports.update = async (req,res)=>{
    //find the cart
    try{
        const cartId = req.params.id;
        const Cart = await cart.findByPk(cartId);
        //find all the products
        const productIds = req.body.productIds;
        const Products = await product.findAll({
            where : {
                id : {
                    [Op.or] : productIds
                }
            }
        });
        //now i have all the products and cart
        //set all those products to the cart
        await Cart.setProducts(Products);
        //find the cost and { all the products with with name,cost,description }
        let cost = 0;
        let CartProducts = [];
        for(let x of Products){
            cost += x.cost;
            CartProducts.push({
                id : x.id,
                name : x.name,
                description : x.description,
                cost : x.cost
            });
        }
        const newCart = {
            cost : cost,
            userId : cart.userId
        };

        //updating the cart with the cost.
        await Cart.update(newCart,{
            where : {
                id : cartId
            }
        });

        res.status(200).send({
            Products : CartProducts,
            Cost : cost,
            Status : "Success"
        });
    }catch(err){
        console.log("Error while updating the cart..");
        res.status(400).send({
            message : err.name || "some Internal Error"
        });
    }
}

/**
 * Getting a cart based on id
 */

exports.findOne = async (req,res)=>{
    const Cart = await cart.findByPk(req.params.id);
    const Products = await Cart.getProducts();
    let CartProducts = [];
    for(let x of Products){
        CartProducts.push({
            id : x.id,
            name : x.name,
            description : x.description,
            cost : x.cost
        });
    }
    res.status(200).send({
        userId : Cart.userId,
        products : CartProducts,
        cost : Cart.cost
    });
};