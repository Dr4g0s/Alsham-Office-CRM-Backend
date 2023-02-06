const Joi = require("joi");

module.exports = {
    addUserSchema:{
        body:Joi.object().required().keys({
            name : Joi.string().min(3).required().messages({
                "string.empty":"sorry ...name is required"
            }),
            email : Joi.string().email().messages({
                "string.email":"sorry ...please enter valid email"
            }),
            password :Joi.string().min(6).required()
        })
    }
} 