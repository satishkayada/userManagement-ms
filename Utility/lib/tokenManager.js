'use strict'
var commonConstant = require('./constants')
module.exports = {
    getSession: getSession
}
function TokenManager(Config) {
    CallConfig = verifyOptionConfig(Config)
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
TokenManager.prototype.getSession(token, callback){
    console.log('Enter into getSession')
    var Key = token;
    var option = {
        method: commonConstant.METHOD_GET,
        url: `${CallConfig.protocal}://${CallConfig.host}:${CallConfig.port}/cash-ms/getKey/${key}/V1`,
        json: true
    }
    request(option, function (error, Response) {
        if (error) {
            callback(error)
        }
        else {

        }
    }
}

