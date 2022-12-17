/**
 * This file will have the logic to create the schema in the database.
 */

module.exports = (sequelize,Sequelize)=>{
    const cart = sequelize.define("cart",{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        cost : {
            type : Sequelize.INTEGER
        }
    });
    return cart;
}