let dbConn = require("../config/bdd");

let Procedure_CIN = function (procedureCIN) {
  this.idProcedureCin = procedureCIN.idProcedureCin;
  this.approbation = procedureCIN.approbation;
  this.etatCin = procedureCIN.etatCin;
  this.dateProcedure = procedureCIN.dateProcedure;
  this.numSeries = procedureCIN.numSeries;
  this.observation = procedureCIN.observation;
  this.p_idUtilisateur = procedureCIN.p_idUtilisateur;
  this.p_cin = procedureCIN.p_cin;
};

const procedure = `
SELECT
    idProcedureCin,
    approbation,
    etatCin, 
    numSeries,
    observation,
    p_idUtilisateur,
    idUtilisateur,
    attribut,
    identification,
    photoPDP,
    mdp,
    etatUtilisateur,
    cin,
    p_cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais, 
    DATE_FORMAT(dateProcedure, '%d-%m-%Y') as dateProcedure,
    DATE_FORMAT(datenais, '%d-%m-%Y') as datenais,
    DATE_FORMAT(datelivrance, '%d-%m-%Y') as datelivrance,
    domicile,
    cicatrice,
    longueur, 
    imgFaceFM,
    imgDosFM,
    p_idOrigine,
    p_idArrondissement,
    p_idProfession
FROM
    PROCEDURE_CIN,
    INDIVIDU,
    UTILISATEUR
WHERE
    PROCEDURE_CIN.p_idUtilisateur = UTILISATEUR.idUtilisateur
    AND PROCEDURE_CIN.p_cin = INDIVIDU.cin `;

const REQUETE_MYSQL_MOIS = ` SELECT
DATE_FORMAT(dateProcedure, '%m') as Mois,
COUNT(IF(etatCin = 'PRIMA', 1, NULL)) 'PRIMA',
COUNT(IF(etatCin = 'USURE', 1, NULL)) 'USURE',
COUNT(IF(etatCin = 'PERTE', 1, NULL)) 'PERTE'
from
PROCEDURE_CIN
GROUP BY
MONTH(dateProcedure) `;

const REQUETE_MYSQL_ANNEE = `SELECT
DATE_FORMAT(dateProcedure, '%Y') as dateProcedure,
COUNT(IF(etatCin = 'PRIMA', 1, NULL)) 'PRIMA',
COUNT(IF(etatCin = 'USURE', 1, NULL)) 'USURE',
COUNT(IF(etatCin = 'PERTE', 1, NULL)) 'PERTE'
from
PROCEDURE_CIN
GROUP BY
YEAR(dateProcedure) `;

const ordre = ` ORDER BY idProcedureCin DESC `;

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1); // parce que Janvier = 0, Fevrier = 1

  return date.toLocaleString("fr-FR", {
    month: "long",
  });
}

Procedure_CIN.addProcedure_CIN = (newProcedure, result) => {
  dbConn.query("INSERT INTO Procedure_CIN SET ?", newProcedure, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      console.log(res);
      result(null, { success: true });
    }
  });
};

Procedure_CIN.getAllProcedures = (result) => {
  dbConn.query(procedure + ordre, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Procedure_CIN.getIdProcedure = (idProcedureCin, result) => {
  dbConn.query(
    procedure + `AND idProcedureCin = ?`,
    idProcedureCin,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Procedure_CIN.searchProcedure_CIN = (valeur, result) => {
  dbConn.query(
    procedure + `AND (p_cin LIKE '%${valeur.value}%')` + ordre,
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Procedure_CIN.updateProcedure_CIN = (
  updateProcedure,
  idProcedureCin,
  result
) => {
  dbConn.query(
    `update PROCEDURE_CIN set ? where idProcedureCin = ${idProcedureCin}`,
    updateProcedure,
    function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, { success: true });
      }
    }
  );
};

Procedure_CIN.getProcedureStats = (result) => {
  dbConn.query(REQUETE_MYSQL_MOIS, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      //stoquer les mois(en lettre) du stats
      const labels = [];

      //stoquer les mois(en chiffre) du stats
      const mois = [];

      //ce VALUES va ordonner toutes les donnees selon leur mois
      const valuesN = [];
      const valuesU = [];
      const valuesP = [];

      //stoquer les donnee du stats
      const donnee = [];
      let objN = {};
      let objU = {};
      let objP = {};

      //stoquer les donnee de retour
      const data = [];

      if (res.length !== 0) {
        //pour chaque element du resultat du mysql dans RES
        res.forEach((element) => {
          //pour chaque element du variable ELEMENT de chq ligne, je les stock dans M
          for (const m in element) {
            // Recuperation des mois disponible
            if (m === "Mois") {
              //element[m] design la valeur du mois en chiffre, je les stock dans MOIS
              mois.push(element[m]);
            }

            // Recuperation des valeur correspondant a chq mois
            if (m === "PRIMA") {
              valuesN.push(element[m]);
            }
            if (m === "USURE") {
              valuesU.push(element[m]);
            }
            if (m === "PERTE") {
              valuesP.push(element[m]);
            }
          }
        });

        // je stock chq VALUES dans OBJ
        objN = Object.assign(objN, { values: valuesN });
        objU = Object.assign(objU, { values: valuesU });
        objP = Object.assign(objP, { values: valuesP });

        // puis j'ajout OBJ a l'array DONNEE
        donnee.push(objN);
        donnee.push(objU);
        donnee.push(objP);
        // pour avoir un format de donnee DONNE[0] = Tableau de plusieur Objet

        mois.forEach((e) => {
          // je stock la valeur des mois en lettre dans labels
          labels.push(toMonthName(e));
        });

        //   j'ajoute mes 02 array dans l'Objet DATAOBJ
        const dataObj = { labels, data: donnee };

        //   j'ajoute l'Objet DATAOBJ dans l'Array DATA
        data.push(dataObj);
      }

      // Je renvoie mon DATA au Front
      result(null, data);
    }
  });
};

module.exports = Procedure_CIN;
