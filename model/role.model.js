/**
 * This file will have the logic to create the role schema in the database.
 */

module.exports = (sequelize,Sequelize)=>{
    const role = sequelize.define("role",{
        name : {
            type : Sequelize.STRING,
            allowNull : false
        }
    });
    return role;
};