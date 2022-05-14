import * as Joi from 'joi'

export const listsVaildation = Joi.object({
    page : Joi.number()
})

export const refundVaildation = Joi.object({
    _tid : Joi.string().min(0).max(15).trim().required(),
})

export const insertVaildation = Joi.object({
    _mid : Joi.string().min(0).max(15).trim().required(),
    _tid : Joi.string().min(0).max(15).trim().required(),
    balance : Joi.number().required(),
})

export const updateVaildation = Joi.object({
    _wid : Joi.string().min(0).max(15).trim().required(),
    _mid : Joi.string().min(0).max(15).trim().required(),
    _tid : Joi.string().min(0).max(15).trim(),
    is_payment : Joi.bool().default(false),
    is_return : Joi.bool().default(false),
    balance : Joi.number().required(),
})

export const deleteVaildation = Joi.object({
    _wid : Joi.string().min(0).max(15).trim().required()
})