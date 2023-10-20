let dbConn = require("../config/bdd");

let Individu = function (individu) {
	this.cin = individu.cin;
	this.nom = individu.nom;
	this.prenom = individu.prenom;
	this.nomPere = individu.nomPere;
	this.nomMere = individu.nomMere;
	this.lieunais = individu.lieunais;
	this.datenais = individu.datenais;
	this.domicile = individu.domicile;
	this.cicatrice = individu.cicatrice;
	this.longueur = individu.longueur;
	this.dateLivrance = individu.dateLivrance;
	this.imgFaceFM = individu.imgFaceFM;
	this.imgDosFM = individu.imgFaceFM;
	this.p_idOrigine = individu.p_idOrigine;
	this.p_idArrondissement = individu.p_idArrondissement;
	this.p_idProfession = individu.p_idProfession;
};

const REQUETE_DE_BASE = `
SELECT
    cin,
    nom,
    prenom,
    nomPere,
    nomMere,
    lieunais, 
    domicile,
    cicatrice,
    longueur, 
    DATE_FORMAT(datenais, '%d-%m-%Y') as datenais,
    DATE_FORMAT(datelivrance, '%d-%m-%Y') as datelivrance2,
    imgFaceFM,
    imgDosFM,
    p_idOrigine,
    nomOrigine,
    p_idArrondissement,
    nomArrondissement,
    adressArrondissement,
    p_idProfession,
    nomProfession `;

const REQUETE_FROM = ` 
FROM
    INDIVIDU,
    ARRONDISSEMENT,
    ORIGINE,
    PROFESSION
WHERE
    INDIVIDU.p_idorigine = ORIGINE.idOrigine
    AND INDIVIDU.p_idArrondissement = ARRONDISSEMENT.idArrondissement
    AND INDIVIDU.p_idProfession = PROFESSION.idProfession `;

const REQUETE_ORDRE = ` ORDER BY dateLivrance DESC `;

Individu.addIndividu = (newIndividu, result) => {
	dbConn.query("INSERT INTO individu SET ?", newIndividu, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

Individu.addIndividuFMFace = (addIndividuFMFace, cin, result) => {
	dbConn.query(
		`update individu set ? where cin = ${cin}`,
		addIndividuFMFace,
		function (err, res) {
			if (err) {
				console.log("FACE : ", err);
				result(err, null);
			} else {
				console.log("FACE : ", res);
				result(null, { success: true });
			}
		}
	);
};

Individu.addIndividuFMDos = (addIndividuFMDos, cin, result) => {
	dbConn.query(
		`update individu set ? where cin = ${cin}`,
		addIndividuFMDos,
		function (err, res) {
			if (err) {
				console.log("DOS : ", err);
				result(err, null);
			} else {
				console.log("DOS : ", res);
				result(null, { success: true });
			}
		}
	);
};

Individu.getAllIndividus = (result) => {
	dbConn.query(REQUETE_DE_BASE + REQUETE_FROM + REQUETE_ORDRE, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Individu.getCinIndividu = (cin, result) => {
	dbConn.query(
		REQUETE_DE_BASE + REQUETE_FROM + ` AND cin = ${cin}`,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Individu.searchIndividu = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE +
			REQUETE_FROM +
			` AND (nom LIKE '%${valeur}%' OR prenom LIKE '%${valeur}%' OR cin LIKE '%${valeur}%')` +
			REQUETE_ORDRE,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.length !== 0) {
					result(null, { res, message: "trouvable !", success: true });
				} else {
					result(null, { res, message: "Introuvable !", success: false });
				}
			}
		}
	);
};

Individu.apercuIndividu = (valeur, result) => {
	dbConn.query(
		REQUETE_DE_BASE +
			REQUETE_FROM +
			`AND ( cin LIKE '${valeur}%' )` +
			REQUETE_ORDRE +
			` LIMIT 3 `,
		(err, res) => {
			if (err) {
				result({ err, message: "erreur !", success: false }, null);
			} else {
				if (res.length !== 0) {
					result(null, { success: true, res });
				} else {
					result(null, {
						success: false,
						message: "Numéro de CIN indisponible",
					});
				}
			}
		}
	);
};

Individu.updateIndividu = (updateIndividu, cin, result) => {
	dbConn.query(
		`update individu set ? where cin = ${cin}`,
		updateIndividu,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Individu.deleteIndividu = (cin, result) => {
	dbConn.query(
		`DELETE FROM Individu WHERE cin = ${cin}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = Individu;
