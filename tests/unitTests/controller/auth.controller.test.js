
/**
 * testing the auth.controller.js file : signin and signup method
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userWithRoles = require("../mockData/userWithRoles.json");
const userWithoutRoles = require("../mockData/userWithoutRoles.json");
const userSigninDetals = require("../mockData/signIn.json");

const { signin , signup } = require("../../../controller/auth.controller");
const { user , role } = require("../../../model");

const { mockRequest , mockResponse } = require("../interceptor");

let req , res;



beforeEach(()=>{
    /**
     * whatever i write here will be executed before every test 
     */
    req = mockRequest();
    res = mockResponse();
});

/**
 * Test the signup method
 */



describe("Testing signup method",()=>{

    afterEach(() => {
        //it will clear all the mock that we have
        //created within each test block
        jest.clearAllMocks();
    });

    /**
     * 1.   Signup is successful
     */
    /**
     * 1.1. when user providing the roles
     */
    it("successful signup,when we provide the roles ",async ()=>{
        req.body = userWithRoles;
        /**
         * Mock 
         * 
         * user.create() 
         * role.findAll()
         */
        const roles = req.body.roles;
        const resFromCreate = {
            id : req.body.id,
            username : req.body.usermae,
            email : req.body.email,
            password : req.body.password,
            setRoles : async () => Promise.resolve(),
            getRoles : async () => Promise.resolve(req.body.roles)
        }

        let spyOnCreate = jest.spyOn(user,"create").mockImplementation(()=>Promise.resolve(resFromCreate));
        let spyOnFindAll = jest.spyOn(role,"findAll").mockImplementation(()=>Promise.resolve(roles));
        await signup(req,res);
        expect(spyOnCreate).toHaveBeenCalled();
        expect(spyOnFindAll).toHaveBeenCalled();
        expect(user.create).toHaveBeenCalled();
        expect(role.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({"message" : "User added successfully"});
    })

    /**
     * 1.2. when user did't provide any roles
     */
    it("successful signup,when we don't provide the roles ",async ()=>{
        req.body = userWithoutRoles;
        const resFromCreate = {
            id : req.body.id,
            username : req.body.usermae,
            email : req.body.email,
            password : req.body.password,
            setRoles : async () => Promise.resolve(),
            getRoles : async () => Promise.resolve(req.body.roles)
        }
        //mock the required functions
        let spyOnCreate = jest.spyOn(user,'create').mockImplementation(()=>Promise.resolve(resFromCreate));
        
        await signup(req,res);
        expect(spyOnCreate).toHaveBeenCalled();
        expect(user.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            message : "User added successfully"
        });
    })

    /**
     * 2.   Signup failed
     */
    it("signup failed", async ()=>{
        req.body = userWithoutRoles;
        /**
         * Mock the required functions
         */
        let spyOnCreate = jest.spyOn(user,'create').mockImplementation(()=>Promise.reject("Error"));
        let spyOnFindAll = jest.spyOn(role,'findAll').mockImplementation(()=>Promise.resolve());

        await signup(req,res);
        
        expect(spyOnCreate).toHaveBeenCalled();
        expect(user.create).toHaveBeenCalled();
        //this function did't called because we have terminated the executation in the user-creation itself.
        expect(spyOnFindAll).not.toHaveBeenCalled();
        expect(role.findAll).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "some internal error"
        });
    });
})


/**
 * Test the signin method
 */


describe("Testing signin method",()=>{


    /**
     * clearing all the mocks after each tests
     */
    afterEach(()=>{
        //this line will clear all the mocks 
        jest.clearAllMocks();
    })

    /**
     * Successful signup
     */
    it("signup successful",async ()=>{
        /**
         * set the request body
         */
        req.body = userSigninDetals;
        /**
         * result from finding the user
         */
        const userReturned = {
            id : userWithRoles.id,
            email : userWithRoles.email,
            username : userWithRoles.username,
            password : userWithRoles.password,
            setRoles : async ()=> Promise.resolve(),
            getRoles : async ()=> Promise.resolve([{
                name : 'admin'
            },{
                name : 'customer'
            }])
        }
        /**
         * mock the functions
         */


        /**
         * mocking user.findOne()
         */
        const spyOnUserFind = jest.spyOn(user,'findOne').mockImplementation(()=>Promise.resolve(userReturned));

        /**
         * mocking bcrypt.compare()
         * and making sure that password is matching
         */
        const spyOnBcyptCompare = jest.spyOn(bcrypt,'compare').mockImplementation(()=>Promise.resolve(true));
        /**
         * Mocking jwt.sign()
         */
        const spyOnJwtSign = jest.spyOn(jwt,'sign').mockImplementation(()=>"Token");

        await signin(req,res);
        /**
         * checking whether expected behaviour is metching with the actual behaviour or not
         */
        expect(spyOnUserFind).toHaveBeenCalled();
        expect(user.findOne).toHaveBeenCalled();
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(spyOnBcyptCompare).toHaveBeenCalled();
        expect(spyOnJwtSign).toHaveBeenCalled();
        expect(jwt.sign).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            id : userWithRoles.id,
            email : userWithRoles.email,
            username : userWithRoles.username,
            roles : ["ROLE_ADMIN","ROLE_CUSTOMER"],
            accessToken : "Token"
        });
    })

    /**
     * signup failed due to wrong password of the user.
     */

    it("signup failed,wrong password provided",async ()=>{
        /**
         * set the request body
         */
        req.body = userSigninDetals;
        /**
         * result from finding the user
         */
        const userReturned = {
            id : userWithRoles.id,
            email : userWithRoles.email,
            username : userWithRoles.username,
            password : userWithRoles.password,
            setRoles : async ()=> Promise.resolve(),
            getRoles : async ()=> Promise.resolve([{
                name : 'admin'
            },{
                name : 'customer'
            }])
        }
        /**
         * mock the functions
         */


        /**
         * mocking user.findOne()
         */
        const spyOnUserFind = jest.spyOn(user,'findOne').mockImplementation(()=>Promise.resolve(userReturned));

        /**
         * mocking bcrypt.compare() and making sure that password 
         * is not matching
         */
        const spyOnBcyptCompare = jest.spyOn(bcrypt,'compare').mockImplementation(()=>Promise.resolve(false));

        await signin(req,res);
        /**
         * checking whether expected behaviour is metching with the actual behaviour or not
         */
        expect(spyOnUserFind).toHaveBeenCalled();
        expect(user.findOne).toHaveBeenCalled();
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(spyOnBcyptCompare).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            message : "Wrong Password"
        });
    })

    /**
     * signup failed due to some internal error
     */

    it("signup failed due to internal issue",async ()=>{
        req.body = userSigninDetals;
        /**
         * mocking user.findOne()
         */
        const spyOnUserFind = jest.spyOn(user,'findOne').mockImplementation(()=>Promise.reject(Error("This is Error")));

        /**
         * calling  the signin function
         */
        await signin(req,res);

        expect(spyOnUserFind).toHaveBeenCalled();
        expect(user.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "This is Error"
        });
    })
})