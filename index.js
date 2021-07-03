const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const getData = require('./services/getData2');

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/api/search/:busca/:pages', async function(req, res) {
  try {

    const result = await getData(req.params.busca, Number(req.params.pages))
    console.log(result)
    res.json(result)

  } catch (error) {
    console.log(error)
    res.sendStatus(500)

  }
})

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/app/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})

// start express server on port 5000
app.listen(port, () => {
  console.log("server started on port 5000");
});
