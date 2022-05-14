import * as Joi from 'joi'

export const listsVaildation = Joi.object({
    page : Joi.number()
})

export const insertVaildation = Joi.object({
    _eid : Joi.string().min(0).max(15).trim().required(),
    topic : Joi.string().min(0).max(255).trim().required(),
    subject : Joi.string().min(1).max(10).trim().required(),
    descript : Joi.string().min(0).max(255).trim().required(),
    image_path : Joi.string().min(0).max(255).trim().required(),
    cost_price : Joi.number().default(0).required(),
    selling_price : Joi.number().default(0).required(),
    qty : Joi.number().default(0).required(),
    stock : Joi.number().default(0).required(),
    stock_warning : Joi.number().default(0).required(),
    tags :  Joi.array().items(Joi.string().trim()).required(),
    is_view : Joi.boolean().default(true),
})
export const updateVaildation = Joi.object({
    _mpid : Joi.string().min(0).max(15).trim().required(),
    _eid : Joi.string().min(0).max(15).trim().required(),
    topic : Joi.string().min(0).max(255).trim().required(),
    subject : Joi.string().min(1).max(10).trim().required(),
    descript : Joi.string().min(0).max(255).trim().required(),
    image_path : Joi.string().min(0).max(255).trim().required(),
    cost_price : Joi.number().default(0).required(),
    selling_price : Joi.number().default(0).required(),
    qty : Joi.number().default(0).required(),
    stock_warning : Joi.number().default(0).required(),
    tags :  Joi.array().items(Joi.string().trim()).required(),
    is_view : Joi.boolean().default(true),
})

export const updateStockVaildation = Joi.object({
    _mpid : Joi.string().min(0).max(15).trim().required(),
    stock : Joi.number().default(0).required()
})

export const deleteVaildation = Joi.object({
    _mpid : Joi.string().min(0).max(15).trim().required()
})