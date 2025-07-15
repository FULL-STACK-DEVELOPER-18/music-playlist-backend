import Playlist from "../models/playlist.model.js";
import { apiResponse } from "../helper/apiResponse.js";
import helper from "../helper/common.js";
import { StatusCodes } from "http-status-codes";

const createPlaylist = async (req, res) => {
  try {
    const { name, description, songs } = req.body;
    const userId = req.user._id;
    const playlist = await Playlist.create({
      name,
      description,
      songs: songs || [],
      user: userId,
    });
    return apiResponse({
      res,
      statusCode: StatusCodes.CREATED,
      status: true,
      message: "Playlist created successfully",
      data: playlist,
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

const getAllPlaylists = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const { skip, limit: lim } = helper.paginationFun({ page, limit });
    const totalItems = await Playlist.countDocuments({ user: userId });
    const playlists = await Playlist.find({ user: userId })
      .skip(skip)
      .limit(lim)
      .sort({ createdAt: -1 });
    const pagination = helper.paginationDetails({ page, totalItems, limit: lim });
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Playlists fetched successfully",
      data: playlists,
      pagination,
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

const getPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const playlist = await Playlist.findOne({ _id: id, user: userId });
    if (!playlist) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Playlist not found",
      });
    }
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Playlist fetched successfully",
      data: playlist,
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

const updatePlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { name, description, songs } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { name, description, songs } },
      { new: true }
    );
    if (!playlist) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Playlist not found",
      });
    }
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Playlist updated successfully",
      data: playlist,
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

const deletePlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const playlist = await Playlist.findOneAndDelete({ _id: id, user: userId });
    if (!playlist) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Playlist not found",
      });
    }
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Playlist deleted successfully",
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
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
}; 