import Joi from "joi";

const updateProfile = Joi.object().keys({
  name: Joi.string().optional().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
});

export default {
  updateProfile,
}; 