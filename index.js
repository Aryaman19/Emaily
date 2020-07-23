const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/Users");
require("./services/passport");

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);
authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
