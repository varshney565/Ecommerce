INTRODUCTION:
-------------
        • This application provides users to create categories of products and upload product details pertaining to their respective categories. Customers can add products to their   respective carts and further order them.
        • There are 2 kinds of user types seen here. They are customer and admin. The admin user type has certain special privileges. Product and it’s respective category resources can be added only by the admin. Customer can go through either the list of categories with their respective products or the products itself.
        • Only the admin has the right to edit product details. Customers can add and delete products onto their cart and order them as well.

TECHNOLOGIES USED:
-------------------

* Java Script
* NODE JS   
* Express ( framework )
* Sequelize ( ORM tool)

DEPENDENCIES INSTALLED:
------------------------

* body parser
* express
* mysql2
* sequelize
* bcrypt
* jsonwebtoken

CONFIGURATION : 
---------------
    In this folder, I have given all the values that can change in the application when used on different environment and systems. The DataBase information is also given in this folder.

MODELS :
--------
    I have created 5 models here namely, 
        * user
        * category
        * products
        * role
        * cart 

    RELATIONSHIPS:
    -------------
        * User and Role have " many to many " relationship.
        * User and Cart have " one to many " relationship.
        * Product and cart have " many to many " relationship. 

CONTROLLERS : 
-------------
     This is the place where all the functionalities are defined for all the models present in the application. All the functionalities are accessed by using APIs from the authenticated and authorized users.

     AUTH CONTROLLER:
     ----------------
        This the place where the user will be redirected when they want to sign up or sign in to the application. User who are signed in will be authenticated and be given with JSON WEB TOKENS, by using that tokens only the user can access the functionalities of the application.
    
     CATEGORY CONTROLLER:
     --------------------
        In this file, authenticated user can Create, update, find one, find All or delete the categories in the application.

     PRODUCT CONTROLLER:
     ------------------
        In this file, authenticated user will have the accessibility to create,update, findall, findone or delete the products in the application.

     CART CONTROLLER:
     ----------------
        In this file, authenticated use will have the accessability to create or update the new cart. Finally everything present in that cart will be displayed to the user along with the total price of the cart.

MIDDLEWARE:
-----------
      This is the folder where every API requests are validated, also every user is authenticated and authorized using json web tokens. In Index.js file in this folder every other files in this folder are linked and exported at once. 

ROUTES:
-------
      This is the folder where every API call source is present, for each API call control is transferred to the correct controller file where all the functionalities are done. Before passing the control to the controllers, middlewares are called to check the authenticity and validation of the API call.
