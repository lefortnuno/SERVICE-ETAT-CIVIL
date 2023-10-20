"use strict";
const Utilisateur = require("../models/utilisateur.model");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (idUtilisateur) => {
  return jwt.sign({ idUtilisateur }, process.env.TOKEN_SECRET, {
    expiresIn: tmp,
  });
};

const storageFace = multer.diskStorage({
  destination: path.join(
    __dirname,
    process.env.PATH_PIC,
    process.env.PATH_PIC_PROFILE
  ),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports.addUtilisateur = (req, res) => {
  let { identification, mdp } = req.body;

  mdp = bcrypt.hashSync(mdp, 10);
  const attribut = "utilisateur";
  const etatUtilisateur = false;
  let i = 0;

  Utilisateur.getLastIdUtilisateur((err, resultatLastID) => {
    if (!err) {
      if (!resultatLastID) {
        i = i + 1;
        identification = identification + "-" + i;
      } else {
        let num = Object.values(resultatLastID);
        num = num[0] + 1;
        identification = identification + "-" + num; // kanto-9
      }

      const newUtilisateur = {
        attribut,
        identification,
        mdp,
        etatUtilisateur,
      };

      Utilisateur.addUtilisateur(newUtilisateur, (erreur, resp) => {
        if (erreur) {
          res.send(erreur);
        } else {
          res.send(resp);
        }
      });
    } else {
      res.send(err);
    }
  });
};

module.exports.addPhotoPdp = (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storageFace }).single("photoPDP");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Selectioner une image à enregistrer.");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        photoPDP: req.file.filename,
      };

      Utilisateur.updateUtilisateur(
        classifiedsadd,
        req.params.id,
        (err, resp) => {
          if (err) {
            res.send(err);
          } else {
            res.send(resp);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.loginUtilisateur = (req, res) => {
  const { identification, mdp } = req.body;

  Utilisateur.loginUtilisateur({ identification }, (err, resp) => {
    if (!err) {
      console.log(resp);
      if (resp.length !== 0) {
        const pwd = resp[0].mdp;
        const validePwd = bcrypt.compareSync(mdp, pwd);

        console.log(validePwd);

        if (validePwd) {
          const token = createToken(resp);
          res.send({ success: true, token, user: resp });
        } else {
          res.send({ success: false });
        }
      } else {
        res.send({ success: false });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.idUtilisateur, (err, resp) => {
    if (!err) {
      if (resp.length !== 0) {
        res.send(resp);
      } else {
        res.send({ message: "Id non trouver" });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports.getLastNumeroCompteUtilisateur = (req, res) => {
  Utilisateur.getLastNumeroCompteUtilisateur((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchUtilisateur = (req, res) => {
  Utilisateur.searchUtilisateur(req.params.valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  let { identification, etatUtilisateur } = req.body;

  if (etatUtilisateur === "true") {
    etatUtilisateur = true;
  } else if (etatUtilisateur === "false") {
    etatUtilisateur = false;
  }

  const updateUtilisateur = {
    identification,
    etatUtilisateur,
  };
  Utilisateur.updateUtilisateur(
    updateUtilisateur,
    req.params.idUtilisateur,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.etatUtilisateur = (req, res) => {
  let { attribut, etatUtilisateur } = req.body;

  const upEtatUtilisateur = {
    attribut,
    etatUtilisateur,
  };
  console.log(upEtatUtilisateur);
  Utilisateur.etatUtilisateur(
    upEtatUtilisateur,
    req.params.idUtilisateur,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteUtilisateur = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
