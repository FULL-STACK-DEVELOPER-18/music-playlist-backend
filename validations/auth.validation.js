import Joi from "joi";

const registerByEmail = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.base": "Name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.base": "Password must be a string",
  }),
});

const loginByEmail = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.base": "Password must be a string",
  }),
});

export default {
  registerByEmail,
  loginByEmail,
};
