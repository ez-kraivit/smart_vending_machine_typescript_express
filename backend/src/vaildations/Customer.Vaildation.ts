import * as Joi from 'joi'

export const listsVaildation = Joi.object({
    page : Joi.number()
})

export const insertVaildation = Joi.object({
    phone : Joi.string().min(0).max(10).trim().required(),
    email : Joi.string().min(0).max(255).trim().required(),
    name : Joi.string().min(0).max(255).trim().required(),
    lastname : Joi.string().min(0).max(255).trim().required(),
    username : Joi.string().min(1).max(10).trim().required(),
    password : Joi.string().min(0).max(255).trim().required(),
    recommend : Joi.string().min(0).max(255).trim().required(),
    role : Joi.number().default(0).required(),
    is_view : Joi.boolean().default(true),
})

export const updateVaildation = Joi.object({
    _cid : Joi.string().min(0).max(15).trim().required(),
    phone : Joi.string().min(0).max(10).trim().required(),
    email : Joi.string().min(0).max(255).trim().required(),
    name : Joi.string().min(0).max(255).trim().required(),
    lastname : Joi.string().min(0).max(255).trim().required(),
    username : Joi.string().min(1).max(10).trim().required(),
    password : Joi.string().min(0).max(255).trim(),
    recommend : Joi.string().min(0).max(255).trim().required(),
    role : Joi.number().default(0).required(),
    is_view : Joi.boolean().default(true),
})

export const deleteVaildation = Joi.object({
    _cid : Joi.string().min(0).max(15).trim().required()
})