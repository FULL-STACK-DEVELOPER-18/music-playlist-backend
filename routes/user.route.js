import express from "express";
import validate from "../middleware/validate.js";
import { verifyToken } from "../middleware/verifyToken.js";
import userController from "../controllers/user.controllers.js";
import userValidation from "../validations/user.validation.js";

const route = express.Router();

route.use(verifyToken);

route.put("/profile", validate(userValidation.updateProfile), userController.updateProfile);
route.delete("/profile", userController.deleteProfile);
route.get("/profile", userController.getUserProfile);

export default route;
