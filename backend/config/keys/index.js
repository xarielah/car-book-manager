require("dotenv").config();

module.exports = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  },
  database: {
    uri: process.env.DB_URI ?? "",
  },
  app: {
    port: process.env.PORT ?? 1234,
    front: process.env.FRONT_DOMAIN ?? "http://localhost:5173",
  },
  session: {
    cookieKey: process.env.COOKIE_SESSION_KEY ?? "",
  },
};
