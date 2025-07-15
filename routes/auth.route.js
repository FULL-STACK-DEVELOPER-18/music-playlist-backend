import validate from "../middleware/validate.js";
import authController from "../controllers/auth.controllers.js";
import authValidation from "../validations/auth.validation.js";
import express from "express";

const route = express.Router();

route.post(
  "/register/email",
  validate(authValidation.registerByEmail),
  authController.registerByEmail
);

route.post(
  "/login/email",
  validate(authValidation.loginByEmail),
  authController.loginByEmail
);

export default route;
