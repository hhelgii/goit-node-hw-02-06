import {Schema, model} from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
const contactSchema=new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    favorite:{
        type:Boolean,
        default:false,
    }
},{versionKey: false, timestamps: true})

contactSchema.post('save',handleSaveError)
contactSchema.pre("findOneAndUpdate",runValidateAtUpdate);
contactSchema.pre("findOneAndUpdate",handleSaveError);

export const contactAddSchema=Joi.object({
    name:Joi.string().required().messages({
        "any.reuired":`"name" must exist`
    }),
    email:Joi.string().required().messages({
        "any.reuired":`"email" must exist`
    }),
    phone:Joi.string().required().messages({
        "any.reuired":`"phone" must exist`
    }),
    favorite:Joi.boolean(),
})

export const contactUpdateFavoriteSchema=Joi.object({
    favorite:Joi.boolean().required(),
})
const Contact=model('contact',contactSchema)
export default Contact
