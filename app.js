const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);
app.use("/api/users", usersRoutes);
app.use("/api/places", placesRoutes);



app.use((req, res, next) => {
  const error = new HttpError("Could no find this roote!", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(5000);
