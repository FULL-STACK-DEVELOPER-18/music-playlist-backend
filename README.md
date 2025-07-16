Music Playlist Management System – Backend

This is the backend for the Music Playlist Management System. It provides RESTful APIs for user authentication, playlist management, and integration with the Spotify API.


Features
1. User Authentication
  - User registration and login
  - Passwords hashed with bcrypt
  - JWT-based authentication and route protection
2.Playlist Management
  - Create, read, update, and delete playlists
  - Add and manage songs in playlists
3.Spotify API Integration
  - Search for songs using the Spotify API
  - Add songs from Spotify search results to playlists
4.Database
  - MongoDB for storing users, playlists, and song details


Tech Stack
- Node.js with Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcrypt for password hashing


Getting Started

Prerequisites
- Node.js (v14+)
- npm
- MongoDB (local or cloud)
- Spotify Developer Account (for API credentials)


Installation

1. Clone the repository:
   git clone [https://github.com/your-username/music-playlist-backend.git](https://github.com/FULL-STACK-DEVELOPER-18/music-playlist-backend.git)
   cd music-playlist-backend

2. Install dependencies:
   npm install

3. Set up environment variables:
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

4. Start the server:
   nodemon index.js  OR node index.js


API Endpoints
1. Authentication
- POST /api/auth/register – Register a new user
- POST /api/auth/login – Login and receive JWT
2. Playlists
- POST /api/playlists – Create a new playlist (auth required)
- GET /api/playlists – Get all playlists for the logged-in user
- GET /api/playlists/:id – Get a specific playlist by ID
- PUT /api/playlists/:id – Update a playlist
- DELETE /api/playlists/:id – Delete a playlist
3. Spotify Integration
- GET /api/spotify/search?q=QUERY – Search for songs on Spotify


Project Structure

  config/           # Configuration files
  controllers/      # Route controller logic
  helper/           # Helper functions
  middleware/       # Express middlewares (auth, validation, error handling)
  models/           # Mongoose models (User, Playlist)
  routes/           # API route definitions
  validations/      # Request validation logic
  index.js          # Entry point
  router.js         # Main router
  package.json


Security
- Passwords are securely hashed using bcrypt.
- JWT is used for authentication and protecting routes.
- All sensitive data is managed via environment variables.
