/**
 * This file will have the logic to mock the request and response
 */

module.exports = {
    /**
     * Mocking req
     */
    mockRequest : ()=>{
        const req = {};
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        req.query = jest.fn().mockReturnValue(req);
        return req;
    },
    /**
     * Mocking res
     */
    mockResponse : ()=>{
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    }
}