import * as Joi from 'joi'

export const listsVaildation = Joi.object({
    page : Joi.number()
})

export const balanceVaildation = Joi.object({
    id : Joi.string()
})

export const insertVaildation = Joi.object({
    _mid : Joi.string().min(0).max(15).trim().required(),
    _cid : Joi.string().min(0).max(15).trim(),
    product_order : Joi.array().items(Joi.string().trim()).required(),
})
export const updateVaildation = Joi.object({
    _tid : Joi.string().min(0).max(15).trim().required(),
    _mid : Joi.string().min(0).max(15).trim().required(),
    _cid : Joi.string().min(0).max(15).trim(),
    note : Joi.string().min(0).max(255).trim().required(),
    discount : Joi.number().default(0).required(),
    drawer_order : Joi.array().items(Joi.string().trim()).required(),
    deposit_order : Joi.array().items(Joi.string().trim()).required(),
    product_order : Joi.array().items(Joi.string().trim()).required(),
    is_payment : Joi.boolean().default(false),
})

export const deleteVaildation = Joi.object({
    _tid : Joi.string().min(0).max(15).trim().required()
})

export const checkPaymentVaildation = Joi.object({
    _tid : Joi.string().min(0).max(15).trim().required()
})