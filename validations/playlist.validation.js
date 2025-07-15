import Joi from "joi";

const song = Joi.object().keys({
  title: Joi.string().required().messages({
    "any.required": "Song title is required",
    "string.empty": "Song title cannot be empty",
    "string.base": "Song title must be a string",
  }),
  artist: Joi.string().required().messages({
    "any.required": "Artist is required",
    "string.empty": "Artist cannot be empty",
    "string.base": "Artist must be a string",
  }),
  album: Joi.string().allow("").optional(),
  spotifyId: Joi.string().required().messages({
    "any.required": "Spotify ID is required",
    "string.empty": "Spotify ID cannot be empty",
    "string.base": "Spotify ID must be a string",
  }),
});

const createPlaylist = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "Playlist name is required",
    "string.empty": "Playlist name cannot be empty",
    "string.base": "Playlist name must be a string",
  }),
  description: Joi.string().allow("").optional(),
  songs: Joi.array().items(song).optional(),
});

const updatePlaylist = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().allow("").optional(),
  songs: Joi.array().items(song).optional(),
});

export default {
  createPlaylist,
  updatePlaylist,
}; 