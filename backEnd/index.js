const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

const utilisateurRoute = require("./routes/utilisateur.route");
const individuRoute = require("./routes/individu.route");
const origineRoute = require("./routes/origine.route");
const professionRoute = require("./routes/profession.route");
const procedureCINRoute = require("./routes/procedure.cin.route");
const arrondissementRoute = require("./routes/arrondissement.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use("/api/utilisateur", utilisateurRoute);
app.use("/api/individu", individuRoute);
app.use("/api/origine", origineRoute);
app.use("/api/profession", professionRoute);
app.use("/api/procedure_cin", procedureCINRoute);
app.use("/api/arrondissement", arrondissementRoute);

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT || process.env.IP_HOST, () => {
  console.log(`Lancé sur ${process.env.IP_HOST}:${process.env.PORT} .... `);
});
