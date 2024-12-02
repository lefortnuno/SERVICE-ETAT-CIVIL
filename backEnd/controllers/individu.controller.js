"use strict";
const Individu = require("../models/individu.model");
const ProcedureCIN = require("../models/procedure.cin.model");
const path = require("path");
const multer = require("multer");

const storageFace = multer.diskStorage({
	destination: path.join(
		__dirname,
		process.env.PATH_PIC,
		process.env.PATH_PIC_FM_FACE
	),
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const storageDos = multer.diskStorage({
	destination: path.join(
		__dirname,
		process.env.PATH_PIC,
		process.env.PATH_PIC_FM_DOS
	),
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

module.exports.addIndividu = (request, result) => {
	const {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		datenais,
		domicile,
		cicatrice,
		longueur,
		idOrigine,
		idArrondissement,
		idProfession,
		numSeries,
		etatCin,
		idUtilisateur,
		observation,
	} = request.body;
 
	const dateAUjourdhui = new Date();
	const dateLivrance = dateAUjourdhui;
	const dateProcedure = dateAUjourdhui;
	const approbation = "1";

	const p_idOrigine = idOrigine;
	const p_idArrondissement = idArrondissement;
	const p_idProfession = idProfession;
	const p_cin = cin;
	const p_idUtilisateur = idUtilisateur;

	const newIndividu = {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		datenais,
		domicile,
		cicatrice,
		longueur,
		dateLivrance, 
		p_idOrigine,
		p_idArrondissement,
		p_idProfession,
	};

	const newProcedure = {
		p_cin,
		numSeries,
		etatCin,
		p_idUtilisateur,
		observation,
		dateProcedure,
		approbation,
	};

	Individu.addIndividu(newIndividu, (erreur, resp) => {
		if (erreur) {
			result.send(erreur);
		} else {
			ProcedureCIN.addProcedure_CIN(newProcedure, (err, res) => {
				if (err) {
					result.send(err);
				} else {
					result.send(resp);
				}
			});
		}
	});
};

module.exports.addIndividuFMFace = (req, res) => {
	try {
		// 'avatar' is the name of our file input field in the HTML form
		let upload = multer({ storage: storageFace }).single("imgFaceFM");

		upload(req, res, function (err) {
			if (!req.file) {
				return res.send("Please select an image to upload");
			} else if (err instanceof multer.MulterError) {
				return res.send(err);
			} else if (err) {
				return res.send(err);
			}

			const classifiedsadd = {
				imgFaceFM: req.file.filename,
			};

			console.log("FACE : ", classifiedsadd);

			Individu.addIndividuFMFace(
				classifiedsadd,
				req.params.cin,
				(err, resp) => {
					if (err) {
						res.send(err);
					} else {
						res.send(resp);
					}
				}
			);
		});
	} catch (err) {}
};

module.exports.addIndividuFMDos = (req, res) => {
	try {
		// 'avatar' is the name of our file input field in the HTML form
		let upload = multer({ storage: storageDos }).single("imgDosFM");

		upload(req, res, function (err) {
			if (!req.file) {
				return res.send("Please select an image to upload");
			} else if (err instanceof multer.MulterError) {
				return res.send(err);
			} else if (err) {
				return res.send(err);
			}

			const classifiedsadd = {
				imgDosFM: req.file.filename,
			};

			console.log("DOS : ", classifiedsadd);

			Individu.addIndividuFMDos(classifiedsadd, req.params.cin, (err, resp) => {
				if (err) {
					res.send(err);
				} else {
					res.send(resp);
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.getAllIndividus = (req, res) => {
	Individu.getAllIndividus((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getCinIndividu = (req, res) => {
	Individu.getCinIndividu(req.params.cin, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.SearchIndividu = (req, res) => {
	Individu.searchIndividu(req.params.valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.apercuIndividu = (req, res) => {
	Individu.apercuIndividu(req.params.valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateIndividu = (req, res) => {
	let {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		domicile,
		cicatrice,
		longueur,
		p_idOrigine,
		p_idArrondissement,
		p_idProfession,
	} = req.body;

	const updateIndividu = {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		domicile,
		cicatrice,
		longueur,
		p_idOrigine,
		p_idArrondissement,
		p_idProfession,
	};
	Individu.updateIndividu(updateIndividu, req.params.cin, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.oldUpdateIndividu = (req, res) => {
	let {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		datenais,
		domicile,
		cicatrice,
		longueur,
		dateLivrance,
		imgFaceFM,
		imgDosFM,
		idOrigine,
		idArrondissement,
		idProfession,
	} = req.body;

	const tmpDate = datenais.split("-");
	const tmpDate2 = dateLivrance.split("-");

	datenais = tmpDate[2] + `-` + tmpDate[1] + `-` + tmpDate[0];
	dateLivrance = tmpDate2[2] + `-` + tmpDate2[1] + `-` + tmpDate2[0];

	const updateIndividu = {
		cin,
		nom,
		prenom,
		nomPere,
		nomMere,
		lieunais,
		datenais,
		domicile,
		cicatrice,
		longueur,
		dateLivrance,
		imgFaceFM,
		imgDosFM,
		idOrigine,
		idArrondissement,
		idProfession,
	};
	Individu.updateIndividu(updateIndividu, req.params.cin, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.deleteIndividu = (req, res) => {
	Individu.deleteIndividu(req.params.id, (err, resp) => {
	  if (!err) {
		res.send(resp);
	  } else {
		res.send(err);
	  }
	});
  };