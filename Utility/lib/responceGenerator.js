'use strict'
var responseConstant = require('./responseConstants')
function ResponseGenerator() {
    console.log('enter into Response Generator contructor')
}
ResponseGenerator.prototype.getResponce = function (response, ResponceCallback) {
    ResponceCallback(getDefaultResponse(response))
}
getDefaultResponse = function (Response) {
    var returnJSON = {};
    returnJSON[responseConstant.ERROR] = (Object.keys(Response).find(Response.ERROR)) ? Response.ERROR : {}
    returnJSON[responseConstant.MESSAGE] = Response.MESSAGE
    returnJSON[responseConstant.DATA] = Response.DATA
    returnJSON[responseConstant.BODY] = Response.BODY
    return returnJSON
}

module.exports.ResponseGenerator = ResponseGenerator;
