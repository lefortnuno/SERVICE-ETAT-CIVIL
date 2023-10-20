let dbConn = require("../config/bdd");

let Utilisateur = function (utilisateur) {
	this.idUtilisateur = utilisateur.idUtilisateur;
	this.identification = utilisateur.identification;
	this.attribut = utilisateur.attribut;
	this.mdp = utilisateur.mdp;
	this.etatUtilisateur = utilisateur.etatUtilisateur;
};

const REQUETE_DE_BASE = `SELECT * FROM utilisateur `;

Utilisateur.addUtilisateur = (newUtilisateur, result) => {
	dbConn.query("INSERT INTO utilisateur SET ?", newUtilisateur, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, { success: true });
		}
	});
};

Utilisateur.loginUtilisateur = (value, result) => {
	const requete = ` WHERE (identification=? AND etatUtilisateur=1)`;
	dbConn.query(REQUETE_DE_BASE + requete, value.identification, (err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, null);
		}
	});
};

Utilisateur.getLastNumeroCompteUtilisateur = (result) => {
	dbConn.query(
		`SELECT idUtilisateur FROM utilisateur ORDER BY idUtilisateur DESC LIMIT 1`,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				let id = 0;
				if (res.length === 0) {
					id = 1;
				} else {
					const tmpID = Object.values(res);
					id = Object.values(tmpID[0]);
					id = id[0] + 1;
				}
				result(null, { idUtilisateur: id });
			}
		}
	);
};

Utilisateur.getAllUtilisateurs = (result) => {
	dbConn.query("SELECT * FROM utilisateur ORDER BY idUtilisateur DESC", (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Utilisateur.getIdUtilisateur = (idUtilisateur, result) => {
	dbConn.query(
		"SELECT * FROM utilisateur WHERE idUtilisateur = ?",
		idUtilisateur,
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Utilisateur.searchUtilisateur = (valeur, result) => {
	dbConn.query(
		`SELECT * FROM utilisateur WHERE identification LIKE '%${valeur}%'`,
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

Utilisateur.updateUtilisateur = (updateUtilisateur, idUtilisateur, result) => {
	dbConn.query(
		`update utilisateur set ? where idUtilisateur = ${idUtilisateur}`,
		updateUtilisateur,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

Utilisateur.etatUtilisateur = (upEtatUtilisateur, idUtilisateur, result) => {
	dbConn.query(
		`update utilisateur set ? where idUtilisateur = ${idUtilisateur}`,
		upEtatUtilisateur,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Utilisateur.getLastIdUtilisateur = (result) => {
	dbConn.query(
		"SELECT idUtilisateur FROM utilisateur ORDER BY idUtilisateur DESC LIMIT 1",
		(err, res) => {
			if (err) {
				return result(err, null);
			} else {
				return result(null, res[0]);
			}
		}
	);
};

Utilisateur.deleteUtilisateur = (numeroCompte, result) => {
	dbConn.query(
		`DELETE FROM utilisateur WHERE idUtilisateur = ${numeroCompte}`,
		function (err, res) {
			if (err) {
				result(err, null);
			} else {
				result(null, { success: true });
			}
		}
	);
};

module.exports = Utilisateur;
