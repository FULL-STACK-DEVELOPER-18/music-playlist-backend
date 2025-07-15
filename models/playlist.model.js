import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  spotifyId: { type: String, required: true },
});

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    songs: [songSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema); 