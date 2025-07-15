import UserModel from "../models/user.model.js";
import { apiResponse } from "../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    const user = await UserModel.findByIdAndUpdate(userId, update, { new: true });
    if (!user) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: false,
      message: "Internal server error",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }

    const { password, ...userData } = user.toObject();

    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "User profile fetched successfully",
      data: userData,
    });
  } catch (error) {
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: false,
      message: "Internal server error",
    });
  }
};

export default {
  getUserProfile,
  updateProfile,
  deleteProfile,
};