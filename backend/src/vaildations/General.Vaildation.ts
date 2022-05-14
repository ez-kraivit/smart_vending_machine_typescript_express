import * as Joi from 'joi'

export const loginVaildation = Joi.object({
    phone : Joi.string().min(1).max(255).trim()
})

export const registerVaildation = Joi.object({
    name : Joi.string().min(0).max(255).trim(),
    lastname : Joi.string().min(0).max(255).trim(),
    phone : Joi.string().min(1).max(10).trim().required(),
    email : Joi.string().min(0).max(255).trim(),
    username : Joi.string().min(0).max(255).trim(),
    password : Joi.string().min(0).max(255).trim(),
    role : Joi.number().default(0),
    is_verify : Joi.boolean().default(true),
})