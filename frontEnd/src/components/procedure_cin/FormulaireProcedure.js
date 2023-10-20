import axios from "../../api/axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsReplyFill, BsFillPersonPlusFill } from "react-icons/bs";

const URL_DE_BASE = `procedure_cin/`;
const URL_CIN = `individu/`;
let isValidate = false;
let existanceIndividu = false;
let contenuTab = false;

export default function FormulaireProcedure() {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	const navigate = useNavigate();

	const mesInputs = {
		etatCin: "",
		numSeries: "",
		observation: "",
		p_cin: "",
		cin: "",
	};
	const previsualisation = {
		cin: "",
		nom: "",
		prenom: "",
	};

	const [inputs, setInputs] = useState(mesInputs);

	const [donnee, setDonnee] = useState([previsualisation]);
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState(mesInputs);
	//#endregion

	//#region // HANDLE CHANGE FONCTION
	const handleChange = (event) => {
		isValidate = true;
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputs((values) => ({ ...values, [name]: value }));
		setErreurs((values) => ({ ...values, messageErreur: false }));
		setErreurs((values) => ({ ...values, [name]: false }));

		if (name === "observation") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " obligatoire",
				}));
			} else if (value.length < 4) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " trop court",
				}));
			} else if (value.length > 100) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "p_cin") {
			rechercheIndividu(value);
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN obligatoire",
				}));
			} else if (value.length > 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "numSeries") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de series obligatoire",
				}));
			} else if (value.length < 4) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de series trop court",
				}));
			} else if (value.length > 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de series trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();
		const inputsObligatoire = ["numSeries", "observation", "p_cin"];

		if (!inputs.etatCin) {
			inputs.etatCin = "PRIMA";
		}
		// if (!inputs.observation) {
		//     inputs.observation = "Aucune";
		// }

		inputsObligatoire.forEach((element) => {
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
			}
		});

		if (!inputs.cin) {
			if (existanceIndividu) {
				inputs.p_cin = donnee[0].cin;
				setErreurs((values) => ({ ...values, p_cin: false }));
				setMessages((values) => ({
					...values,
					p_cin: "",
				}));
				isValidate = true;
			} else {
				setErreurs((values) => ({ ...values, p_cin: true }));
				setMessages((values) => ({
					...values,
					p_cint: "Numero de CIN introuvable",
				}));
				isValidate = false;
			}
		}

		console.log(
			" --------- ",
			isValidate,
			existanceIndividu,
			" --------------"
		);
		if (isValidate && existanceIndividu) {
			console.log("inputs : ", inputs);
			onSubmit();
		} else {
			toast.warn("Verifier les champs!");
		}
	};
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		const dataInputs = Object.assign(inputs, {
			roleU: u_info.u_attribut,
			p_idUtilisateur: u_info.u_idUtilisateur,
			// p_cin: inputs.p_cin
		});

		console.log(dataInputs);
		axios.post(URL_DE_BASE, dataInputs, u_info.opts).then(function (response) {
			if (response.status === 200) {
				if (response.data.success) {
					toast.success("Ajout Reussi.");

					onClose();
				} else {
					toast.error("Echec de l'Ajout!");
				}
			} else {
				toast.error("Echec de l'Ajout!");
			}
		});
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	const resetDonnee = async () => {
		donnee.splice(0, donnee.length);
		contenuTab = false;
	};

	function onClose() {
		const inputsArray = Object.keys(inputs);

		inputsArray.forEach((element) => {
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});

		resetDonnee();
		// console.log("EXIT", donnee);
		navigate("/procedure/");
	}
	//#endregion

	const pageIndividu = () => {
		navigate("/newIndividu/");
	};

	//#region // ----- MA RECHERCHE -----
	function rechercheIndividu(valeur) {
		if (!valeur) {
			contenuTab = false;
		} else {
			axios.get(URL_CIN + `apercu/${valeur}`, u_info.opts).then((response) => {
				if (response.status === 200) {
					const ux = response.data;
					if (ux.success) {
						const u = ux.res;
						setDonnee(u);
						setErreurs((values) => ({ ...values, cin: false }));
						setMessages((values) => ({
							...values,
							cin: "",
						}));

						// isValidate=true
						contenuTab = true;
						existanceIndividu = true;
					} else {
						const aucuneDonnee = Object.assign(
							{},
							{
								cin: "000000000000",
								nom: ux.message,
								prenom: ux.message,
							}
						);

						setDonnee([aucuneDonnee]);
						setErreurs((values) => ({ ...values, cin: true }));
						setMessages((values) => ({
							...values,
							cin: ux.message,
						}));

						// isValidate=false
						contenuTab = true;
						existanceIndividu = false;
					}
				} else {
					setDonnee([]);
					contenuTab = false;
					// isValidate=false
					existanceIndividu = false;
				}
			});
		}
	}
	//#endregion

	return (
		<>
			<div className="row">
				<div className="monContainer">
					<header>
						Procedure e-CIN :-{" "}
						<BsFillPersonPlusFill
							className="text-primary"
							style={{ cursor: "pointer" }}
							onClick={pageIndividu}
						/>{" "}
						-:{" "}
					</header>

					<form>
						<div className="form first">
							<div className="details personal">
								<div className="fields">
									<div className="input-field">
										<label>Etat du CIN : </label>
										<select
											name="etatCin"
											onChange={handleChange}
											autoComplete="off"
										>
											<option value="PRIMA">- PRIMA</option>
											<option value="USURE">- USURE</option>
											<option value="PERTE">- PERTE</option>
										</select>
									</div>

									<div className="input-field">
										<label>Numéro de series :</label>
										<input
											type="text"
											name="numSeries"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Entrez le numéro de series"
										/>
										<small className="text-danger d-block">
											{erreurs.numSeries ? messages.numSeries : null}
										</small>
									</div>

									<div className="input-field">
										<label>
											Numéro de CIN :
											<small className="text-danger d-block">
												{erreurs.cin ? messages.cin : null}
											</small>
										</label>
										<input
											type="number"
											min="1"
											name="p_cin"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Entrez le numéro de CIN"
										/>
										<small className="text-danger d-block">
											{erreurs.p_cin ? messages.p_cin : null}
										</small>
									</div>

									{contenuTab || donnee.length === 0 ? (
										<div className="input-field">
											<label>Liste Numéro de CIN :</label>
											<select
												name="p_cin"
												value={donnee.cin}
												onChange={handleChange}
												autoComplete="off"
												style={{
													backgroundColor: "rgb(226, 226, 226)",
													color: "#000",
												}}
											>
												{donnee.map((d, index) => (
													<option value={d.cin} key={index}>
														If° {d.cin} - {d.nom}
													</option>
												))}
											</select>

											<small className="text-danger d-block">
												{erreurs.cin ? messages.cin : null}
											</small>
										</div>
									) : null}

									<div className="input-field">
										<label>Observation :</label>
										<textarea
											as="text"
											name="observation"
											onChange={handleChange}
											autoComplete="off"
											placeholder="Une observation ? ...."
										/>
										<small className="text-danger d-block">
											{erreurs.observation ? messages.observation : null}
										</small>
									</div>
								</div>

								<div className="buttons">
									<div className="backBtn btn btn-danger" onClick={onClose}>
										<BsReplyFill />
										<span className="btnText"> Annuler</span>
									</div>

									<button className="btn btn-success" onClick={validation}>
										<span className="btnText"> Enregistrer</span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
