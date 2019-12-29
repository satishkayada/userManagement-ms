/*
    This Controller is used to Get All user details
*/

module.exports = {
    getAllUser: getAllUser
}
function getAllUser(req, res) {
    var params = [{ "name": "satish" }]
    var Headers = [{ "calling-entity": "UI" }]
    var body = {}
    sails.CallService.call('AUTH_MS_LOGIN', params, body, Headers, (error, response) => {
        if (error) console.log(error)
        else {
            JOSNObject = JSON.parse(response.body)
            res.send(JOSNObject)
        }
    });
}
