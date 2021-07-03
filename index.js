const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const getData = require('./services/getData2');

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

app.get("/", (req, res) => {
  res.send('OK')
})

// start express server on port 5000
app.listen(process.env.PORT , () => {
  console.log("server started on port", process.env.PORT );
});
