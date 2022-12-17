/**
 * This file is for testing each method of the category controller.
 */

/**
 * importing the category and its methods
 */
const {category} = require("../../../model");
const {create,update,destroy,findAll,findOne} = require("../../../controller/category.controller");

/**
 * importing the mock-category-data
 */
const categoryData = require("../mockData/category.json");
/**
 * importing the mockRequest and mockResponse from interceptor.js
 * which were used for mocking the req and res
 */

const {mockRequest,mockResponse} = require("../interceptor");

let req,res;

beforeEach(()=>{
    req = mockRequest(),
    res = mockResponse()
})



/**
 * 1 : testing category.create() method
 */



describe("testing category create method",()=>{
    //this line will clear all the mock functions after each tests
    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("category added successfully",async ()=>{

        //pass the data to the request body

        req.body = categoryData;

        /**
         * mock the functions
         */

        const spyOncreate = jest.spyOn(category,'create').mockImplementation(()=>Promise.resolve(categoryData));

        //calling the controller function

        await create(req,res);

        /**
         * validating : 
         * 
         * 1 : spyOncreate has called
         * 2 : category.create has called
         * 3 : res.status should be 201
         * 4 : res.send should be category data
         */

        expect(spyOncreate).toHaveBeenCalled();
        expect(category.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(categoryData);
    })

    it("some error while creating the category",async ()=>{
        //pass the data to the request body
        req.body = categoryData;
        /**
         * mock the functions
         */

        /**
         * mocking the category.create and throwing some error
         */
        const spyOncreate = jest.spyOn(category,'create').mockImplementation(()=>Promise.reject(Error()));

        //calling the create method

        await create(req,res);

        /**
         * validation : 
         * 1 : spyOncreate has called
         * 2 : category.create has called
         * 3 : res.status should be 500
         * 4 : res.send should be {
         *          message : "Some internal server Error"
         *     }
         */

        expect(spyOncreate).toHaveBeenCalled();
        expect(category.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "Some internal server Error"
        });
    })
});




/**
 * 2 : testing category.findAll() method
 */



describe("testing category findAll Method", () => {

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("testing when query params provided(filter based on name)",async ()=>{
        /**
         * set the request body
         */

        req.query = {
            name : "Electronics"
        }

        /**
         * result from fetching all the categories
         */

        const resFromFindAll = [
            {
                id : 1,
                name : "Electronics",
                description : "This category has all the electronics items"
            },
        ]

        /**
         * Functions to mock 
         * 
         * 1 : category.findAll()
         * 
         */

        const spyOnFindAll = jest.spyOn(category,'findAll').mockImplementation(()=>Promise.resolve(resFromFindAll));

        await findAll(req,res);

        /**
         * validation : 
         * 
         * 1 : checking whether spyOnFindAll has been called
         * 
         * 2 : checking whether categry.findALl
         * has been called
         * 
         * 3 : checking whether res.status() has been called with status code 200
         * 
         * 4 : checking whether res.send() has beed called with resFromFindAll
         */

        expect(spyOnFindAll).toHaveBeenCalled();
        expect(category.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(resFromFindAll);
    });

    it("testing when fetching all the categories(no filter or no query param provided)",async () => {

        /**
         * setting the req.query.name as empty
         */

        req.query = {
            name : ''
        }

        /**
         * result from fetching all the categories
         */

        const resFromFindAll = [
            {
                id : 1,
                name : "Electronics",
                description : "This category has all the electronics items"
            },
            {
                id : 2,
                name : "Kitchen",
                description : "This category has all the kitchen items"
            },
            {
                id : 3,
                name : "Food",
                description : "This category has all the food items"
            }
        ]

        /**
         * Functions to mock 
         * 
         * 1 : category.findAll()
         * 
         */

        const spyOnFindAll = jest.spyOn(category,'findAll').mockImplementation(()=>Promise.resolve(resFromFindAll));

        await findAll(req,res);

        /**
         * validation : 
         * 
         * 1 : checking whether spyOnFindAll has been called
         * 
         * 2 : checking whether categry.findALl
         * has been called
         * 
         * 3 : checking whether res.status() has been called with status code 200
         * 
         * 4 : checking whether res.send() has beed called with resFromFindAll
         */

        expect(spyOnFindAll).toHaveBeenCalled();
        expect(category.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(resFromFindAll);
    });
    
    it("some error while fetching the category",async () => {
        req.query = {
            name : ''
        }

        /**
         * Functions to mock 
         * 
         * 1 : category.findAll()
         * 
         */

        const spyOnFindAll = jest.spyOn(category,'findAll').mockImplementation(()=>Promise.reject(Error("This is Error")));

        await findAll(req,res);

        /**
         * validation : 
         * 
         * 1 : checking whether spyOnFindAll has been called
         * 
         * 2 : checking whether categry.findALl
         * has been called
         * 
         * 3 : checking whether res.status() has been called with status code 500
         * 
         * 4 : checking whether res.send() has beed called with 
         *     {
         *        message : "This is Error"
         *     }
         */

        expect(spyOnFindAll).toHaveBeenCalled();
        expect(category.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "This is Error"
        });
    });
});

