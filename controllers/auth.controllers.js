import bcrypt from "bcrypt";
import { apiResponse } from "../helper/apiResponse.js";
import helper from "../helper/common.js";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model.js";

const registerByEmail = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (user) {
      return apiResponse({
        res,
        status: false,
        message: "Email id already in use",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      password: hashPassword,
      name: name,
    });

    return apiResponse({
      res,
      statusCode: StatusCodes.CREATED,
      status: true,
      message: `Registration complete!`,
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

const loginByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return apiResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        status: false,
        message: "No account found",
      });
    }

    const userPassword = user?.password || "";
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: "Invalid credentials",
      });
    }

    const token = await helper.generateToken({ userId: user._id });

    const users = {
      token: token,
      user: {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
      },
    };

    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Login successful",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return apiResponse({
      res,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: false,
      message: "Internal server error",
    });
  }
};

export default {
  registerByEmail,
  loginByEmail,
};
