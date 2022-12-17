/**
 * This file will have the logic to create the user schema.
 */

module.exports = (sequelize,Sequelize)=>{
    const user = sequelize.define("user",{
        email : {
            type : Sequelize.STRING,
            allowNull : false
        },
        username : {
            type : Sequelize.STRING,
            aloowNull : false
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        }
    });
    return user;
};