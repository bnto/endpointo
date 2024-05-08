const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Define a route for your API
app.post("/", (req, res) => {
  // curl -X POST -H "Content-Type: application/json" -d '{"url": ""}' http://localhost:3000/
  const url = req.body.url;

  console.log(url);
  fetch(url)
    .then((response) => response.text())
    .then((str) => {
      res.json(str);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
