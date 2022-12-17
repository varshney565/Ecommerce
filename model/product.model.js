/**
 * This file will have the logic to create the schema of the producs
 */

module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("product",{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        cost : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING,
            allowNull : true
        }
    });
    return Product;
};