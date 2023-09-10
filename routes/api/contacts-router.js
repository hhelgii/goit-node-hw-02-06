import express from "express";

import contactsService from "../../models/contacts/contacts.js";
import { HttpError } from "../../helpers/index.js";
import contactsSchema from '../../schemas/contactsSchema.js'
const contactsRouter = express.Router();
// const contactsSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": 'missing required "name" field',
//   }),
//   email: Joi.string().required().messages({
//     "any.required": 'missing required "email" field',
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": 'missing required "phone" field',
//   }),
// });

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact whit id=${contactId} not found`);
    }
    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
export default contactsRouter;
