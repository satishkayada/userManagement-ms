'use strict'
var _ = require('lodash');
var request = require('request')
var commonConstant = require('./constants')
let CallConfig = {}
function CallMS(Config) {
    CallConfig = verifyOptionConfig(Config)
    console.log('In Call Constructor', CallConfig)
}
function verifyOptionConfig(config) {
    var configOption = _.cloneDeep(config)
    if (typeof configOption !== 'object')
        throw new TypeError('config Require')
    if (typeof configOption.protocal !== 'string')
        throw new TypeError('config protocal string')
    if (typeof configOption.host !== 'string')
        throw new TypeError('config host string')
    if (typeof configOption.port !== 'number')
        throw new TypeError('config port require')
    return configOption
}
CallMS.prototype.call = function (key, passParams, body, headers, callback) {
    console.log('enter into CallMS-call')
    var option = {
        method: commonConstant.METHOD_GET,
        url: `${CallConfig.protocal}://${CallConfig.host}:${CallConfig.port}/cash-ms/getKey/${key}/V1`,
        json: true
    }
    console.log(option)
    request(option, function (error, Response) {
        if (error) {
            callback(error)
        }
        else {
            console.log()
            if (Response.body[commonConstant.CONFIG_IS_ERROR] == true) {
                callback(Response.body.message)
                return
            }
            console.log('After Ready key ', Response.body, 'Params Count :', Response.body[commonConstant.CONFIG_PARAMS_COUNT])
            var callOption = Response.body;
            if (callOption.paramsCount != passParams.length) {
                callback('parameters count mismatch')
                return
            }
            console.log(commonConstant.CONFIG_URL)
            var URL = Response.body[commonConstant.CONFIG_URL]
            console.log(URL)
            URL = URL.replace('$', ':')
            passParams.forEach(element => {
                var paraName = Object.keys(element)[0]
                var paraValue = element[paraName]
                URL = URL.replace(':' + paraName, paraValue)
            })
            var callOption = {};
            callOption[commonConstant.CONFIG_URL] = URL
            callOption[commonConstant.CONFIG_METHOD] = Response.body[commonConstant.CONFIG_METHOD]
            callOption[commonConstant.CONFIG_HEADERS] = headers
            if (Response.body[commonConstant.CONFIG_METHOD].isBodynull == false) {
                callOption[commonConstant.CONFIG_BODY] = body
            }
            console.log(callOption)
            request(callOption, function (error, InnerResponse) {
                var ResponseBody = {}
                ResponseBody.body = (InnerResponse) ? (InnerResponse.body) ? InnerResponse.body : {} : {};
                ResponseBody.statusCode = (InnerResponse) ? (InnerResponse.statusCode) ? InnerResponse.statusCode : {} : {};
                callback(null, ResponseBody)
            })
        }
    })
}
module.exports.CallMS = CallMS