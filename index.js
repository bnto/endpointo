import express from "express";
import xml_reader from "./src/xml_reader.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static("public"));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle the POST request
app.post("/api/rss", (req, res) => {
  const data = req.body?.data;
  if (!data) return res.status(400).json({ error: "Invalid data" });

  // Do something with the data
  fetch(data)
    .then((response) => response.text())
    .then((str) => {
      // res.send(str);
      res.send(`${xml_reader(str)}`);
    });
  // res.json({ message: 'Received data successfully!', data: data });
});

app.get("/", (req, res) => {
  res.send(`
    <html><head><link rel="stylesheet" href="style.css"></head><body>
    <h1>endpoi.nto.lu</h1>
    <form hx-post="/api/rss" hx-target="#response" hx-indicator="#spinner">
      <input
        type="text"
        name="data"
        value=""
      />
      <button type="submit">RSS</button>
    </form>
    <p id="spinner" class="htmx-indicator">loading...</p>
    <div id="response" hx-target="#response" hx-swap="innerHTML"></div>
    <script
      src="https://unpkg.com/htmx.org@1.9.12"
      integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
      crossorigin="anonymous"
    ></script></body></html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
