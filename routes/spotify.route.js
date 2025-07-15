import express from "express";
import { verifyToken} from "../middleware/verifyToken.js";
import spotifyController from "../controllers/spotify.controllers.js";

const route = express.Router();

route.use(verifyToken);

route.get("/search", spotifyController.searchSongs);

export default route; 