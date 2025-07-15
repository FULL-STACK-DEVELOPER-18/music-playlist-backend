import fetch from "node-fetch";
import { apiResponse } from "../helper/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import config from "../config/config.js";

let spotifyToken = null;
let tokenExpiresAt = 0;

const getSpotifyToken = async () => {
  if (spotifyToken && Date.now() < tokenExpiresAt) {
    return spotifyToken;
  }
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          config.spotify.clientId + ":" + config.spotify.clientSecret
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await resp.json();
  spotifyToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return spotifyToken;
};

const searchSongs = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return apiResponse({
        res,
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "Query parameter 'q' is required",
      });
    }
    const token = await getSpotifyToken();
    const resp = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(q)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await resp.json();
    const songs = (data.tracks?.items || []).map((item) => ({
      title: item.name,
      artist: item.artists.map((a) => a.name).join(", "),
      album: item.album.name,
      spotifyId: item.id,
    }));
    return apiResponse({
      res,
      statusCode: StatusCodes.OK,
      status: true,
      message: "Songs fetched successfully",
      data: songs,
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
  searchSongs,
}; 