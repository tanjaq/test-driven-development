function createApp(
  validateUsername,
  validatePassword
) {
  const express = require("express");
  const cors = require("cors");
  //const validateUsername = require("./validation/validateUsername");
  //const validatePassword = require("./validation/validatePassword");

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(express.static(__dirname + "/public"));

  app.post("/users", (req, res) => {
    const { username, password } = req.body;

    const validUsername =
      validateUsername(username);
    const validPassword =
      validatePassword(password);

    if (validUsername && validPassword) {
      res.send({ message: "Valid User" });
    } else {
      res.send({ error: "Invalid User" });
    }
  });
  return app;
}

module.exports = createApp;
