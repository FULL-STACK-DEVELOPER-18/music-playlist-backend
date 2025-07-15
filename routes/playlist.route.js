import express from "express";
import validate from "../middleware/validate.js";
import {verifyToken} from "../middleware/verifyToken.js";
import playlistController from "../controllers/playlist.controllers.js";
import playlistValidation from "../validations/playlist.validation.js";

const route = express.Router();

route.use(verifyToken);

route.post(
  "/",
  validate(playlistValidation.createPlaylist),
  playlistController.createPlaylist
);

route.get("/", playlistController.getAllPlaylists);

route.get("/:id", playlistController.getPlaylist);

route.put(
  "/:id",
  validate(playlistValidation.updatePlaylist),
  playlistController.updatePlaylist
);

route.delete("/:id", playlistController.deletePlaylist);

export default route; 