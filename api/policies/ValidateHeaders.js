// const schema = require('./Schema').userSchema
// const Joi = require('./@hapi/joi')

module.exports = async function (req, res, next) {
    try {
        // let Validate = schema.userSchema();
        // let value = await Validate.validateAsync(req.params)
        next()
    } catch (error) {
        res.send(error.details)
    }
}
