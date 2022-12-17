/**
 * This file will have the logic to create the category schema in the database.
 */

module.exports = (sequelize,Sequelize)=>{
    const category = sequelize.define("category",{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING,
            allowNull : true
        }
    },{
        tableName : "categories"
    });
    return category;
}
