import Joi from "joi";
import dotenv from "dotenv";
import { parseJoiError } from "../helper/apiResponse.js";

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.number().required().description("Port number"),
  MONGODB_URL: Joi.string().required().description("MongoDB URL"),
  JWT_SECRET_KEY: Joi.string().description("Jwt secret key"),
})
  .unknown()
  .prefs({ errors: { label: "key" } });

const { value: envVars, error } = envVarsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  const parsedError = parseJoiError(error);
  console.error("Config Error: ", parsedError);
  process.exit(1);
}

const config = {
  port: envVars.PORT,
  mongodb: {
    url: envVars.MONGODB_URL,
    options: {},
  },
  jwt: {
    secretKey: envVars.JWT_SECRET_KEY,
    expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || "f55995b2acfe4575b5a8a8e8ab102cb5",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "0035a31443ed445aac3a21123752b52b",
  },
};

export default config;
