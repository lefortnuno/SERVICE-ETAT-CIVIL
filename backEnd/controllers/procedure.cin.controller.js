"use strict";
const ProcedureCIN = require("../models/procedure.cin.model");

module.exports.addProcedureCIN = (req, res) => {
	const { etatCin, numSeries, observation, p_idUtilisateur, p_cin } = req.body;
	const approbation = "oui";
	const dateProcedure = new Date();
	console.log(p_cin);

	const newProcedureCIN = {
		etatCin,
		approbation,
		dateProcedure,
		numSeries,
		observation,
		p_idUtilisateur,
		p_cin,
	};
	console.log(newProcedureCIN);
	ProcedureCIN.addProcedure_CIN(newProcedureCIN, (erreur, resp) => {
		if (erreur) {
			res.send(erreur);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllProcedures = (req, res) => {
	ProcedureCIN.getAllProcedures((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdProcedure = (req, res) => {
	ProcedureCIN.getIdProcedure(req.params.idProcedureCin, (err, resp) => {
		if (!err) {
			if (resp.length !== 0) {
				res.send(resp);
			} else {
				res.send({ message: " non trouver" });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.SearchProcedure = (req, res) => {
	let { value } = req.body;
	const valeur = { value };

	ProcedureCIN.searchProcedure_CIN(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateProcedureCIN = (req, res) => {
	let { etatCin, numSeries, observation, p_idUtilisateur } = req.body;

	const updateProcedureCIN = {
		etatCin,
		numSeries,
		observation,
		p_idUtilisateur,
	};
	ProcedureCIN.updateProcedure_CIN(
		updateProcedureCIN,
		req.params.idProcedureCin,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};

module.exports.getProcedureStats = (req, res) => {
	ProcedureCIN.getProcedureStats((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};
