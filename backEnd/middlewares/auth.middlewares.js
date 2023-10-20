const utilisateurModel = require("../models/utilisateur.model");
const jwt = require("jsonwebtoken");

module.exports.checkUtilisateur = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (decodedToken) {
        const dtok = decodedToken.id[0];
        utilisateurModel.getIdUtilisateur(dtok.id, (err, resultat) => {
          if (resultat[0].attribut == "chef" || resultat[0].attribut == "admin") {
            next();
          } else {
            res.status(401).send({
              message: `Vous etes un simple ${resultat[0].attribut} !`,
              success: false,
            });
          }
        });
      } else {
        res.status(401).send({
          message: `Unauthorized! Failed to Decode Token !`,
          success: false,
        });
      }
    });
  } else {
    res.status(401).send({
      message: `Unauthorized! token invalide!`,
      success: false,
    });
  }
};
