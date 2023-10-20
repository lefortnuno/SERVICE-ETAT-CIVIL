import axios from "../../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsEnvelopeFill, BsLockFill, BsArrowLeft } from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;
const URL_LAST_ID = URL_DE_BASE + `numeroCompte/`;
let isValidate = false;

export default function FormulaireEnregistrement() {
	//#region // MES VARIABLES
	const navigate = useNavigate();
	const [picPhotoPDP, setPicPhotoPDP] = useState({
		file: [],
		filepreview: null,
	});
	const [latNumeroCompte, setLatNumeroCompte] = useState({
		idUtilisateur: "",
	});

	const [inputs, setInputs] = useState({
		identification: "",
		photoPDP: "",
		mdp: "",
		confirmationMdp: "",
	});

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		messageErreur: "",
		identification: "",
		photoPDP: "",
		mdp: "",
		confirmationMdp: "",
	});
	//#endregion

	//#region // DERNIERE NUMERO COMPTE UTILISATEUR FUNC
	useEffect(() => {
		getlastUtilisateur();
	}, []);

	function getlastUtilisateur() {
		axios.get(URL_LAST_ID).then(function (response) {
			console.log(response);
			if (response.status === 200) {
				setLatNumeroCompte(response.data);
				console.log(response.data);
			} else {
				toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
			}
		});
	}

	//#endregion

	//#region // HANDLE CHANGE IMAGE FUNC
	const handlePicturePhotoPDP = (event) => {
		setPicPhotoPDP({
			...picPhotoPDP,
			file: event.target.files[0],
			filepreview: URL.createObjectURL(event.target.files[0]),
		});
		isValidate = true;
		setErreurs((values) => ({ ...values, photoPDP: false }));
	};
	//#endregion

	//#region // HANDLE CHANGE FONCTION
	const handleChange = (event) => {
		isValidate = true;
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputs((values) => ({ ...values, [name]: value }));
		setErreurs((values) => ({ ...values, messageErreur: false }));

		if (
			name === "identification" ||
			name === "mdp" ||
			name === "confirmationMdp"
		) {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " obligatoire",
				}));
			} else if (value.length < 4) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " trop court",
				}));
			} else if (value.length > 8) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: name + " trop long",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}

		if (name === "confirmationMdp") {
			if (value !== inputs.mdp) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: " Les Mot de passe ne correspondent pas",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}
		if (name === "mdp") {
			setErreurs((values) => ({ ...values, confirmationMdp: false }));
			setMessages((values) => ({ ...values, confirmationMdp: "" }));
		}
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();

		const inputsArray = Object.keys(inputs);
		inputsArray.forEach((element) => {
			if (element !== "photoPDP") {
				const value = Object.values(inputs[element]);
				if (value.length === 0) {
					setErreurs((values) => ({ ...values, [element]: true }));
					setMessages((values) => ({
						...values,
						[element]: "Champ " + [element] + " obligatoire",
					}));
					isValidate = false;
				}
			}
		});

		if (picPhotoPDP.file.length === 0) {
			setErreurs((values) => ({ ...values, photoPDP: true }));
			setMessages((values) => ({
				...values,
				photoPDP: " photo de profil obligatoire",
			}));
			isValidate = false;
		}
		console.log(latNumeroCompte.idUtilisateur);

		if (isValidate) {
			onSubmit();
		}
	};
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		axios.post(URL_DE_BASE, inputs).then(function (response) {
			console.log(response);
			if (response.status === 200) {
				if (response.data.success) {
					toast.success("Ajout Reussi.");
					ajoutPhotoPDP();
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

	//#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
	const ajoutPhotoPDP = async () => {
		const formdata = new FormData();
		formdata.append("photoPDP", picPhotoPDP.file);
		const numeroCompteAnticiper = latNumeroCompte.idUtilisateur;

		axios
			.put(URL_DE_BASE + `photoPDP/` + `${numeroCompteAnticiper}`, formdata, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				if (res.data.success) {
					toast.success("Compte creer avec success.");
				}
			});
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		const inputsArray = Object.keys(inputs);

		inputsArray.forEach((element) => {
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});

		picPhotoPDP.file = [];

		navigate("/");
	}
	//#endregion

	return (
		<>
			<form className="login100-form validate-form form-sEnregistre" >
				<span className="login100-form-title">S'enregistrer</span>

				<div className="row">
					<div className="col-6">
						<div className="wrap-input100 ">
							<div className="input-field ">
								{!picPhotoPDP.filepreview ? (
									<img
										src={process.env.PUBLIC_URL + `/picture/images/img-01.png`}
										alt="image"
										style={{ width: "150px", height: "150px" }}
									/>
								) : (
									<img
										src={picPhotoPDP.filepreview}
										alt="image"
										style={{
											width: "150px",
											height: "150px",
											borderRadius: "50%",
										}}
									/>
								)}

								<label>Photo de profile : </label>
								<input
									type="file"
									name="photoPDP"
									onChange={handlePicturePhotoPDP}
									autoComplete="off"
									placeholder="Photo"
									className="monPhotoPDP"
								/>
								<small className="text-danger d-block">
									{erreurs.photoPDP ? messages.photoPDP : null}
								</small>
							</div>
						</div>
					</div>

					<div className="col-6">
						<div class="wrap-input100 validate-input">
							<input
								className="input100"
								type="text"
								name="identification"
								onChange={handleChange}
								autoComplete="off"
								placeholder="Identifiant "
							/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i aria-hidden="true">
									<BsEnvelopeFill />
								</i>
							</span>
							<small className="text-danger d-block pl-3 pt-1">
								{erreurs.identification ? messages.identification : null}
							</small>
						</div>

						<div className="wrap-input100 validate-input">
							<input
								className="input100"
								type="password"
								name="mdp"
								onChange={handleChange}
								autoComplete="off"
								placeholder="Mot de passe"
							/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i aria-hidden="true">
									<BsLockFill />
								</i>
							</span>
							<small className="text-danger d-block pl-3 pt-1">
								{erreurs.mdp ? messages.mdp : null}
							</small>
						</div>

						<div className="wrap-input100 validate-input">
							<input
								className="input100"
								type="password"
								name="confirmationMdp"
								onChange={handleChange}
								autoComplete="off"
								placeholder="Confirmer le Mot de passe"
							/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i aria-hidden="true">
									<BsLockFill />
								</i>
							</span>
							<small className="text-danger d-block pl-3 pt-1">
								{erreurs.confirmationMdp ? messages.confirmationMdp : null}
							</small>
						</div>
					</div>
				</div>

				<div className="container-login100-form-btn">
					<button className="login100-form-btn" onClick={validation}>
						Sauvegarder
					</button>
				</div>
				<br />

				<div className="text-center p-t-12">
					<span className="txt1"> Des </span>
					<a className="txt2" href="#">
						difficulter
					</a>
					<span className="txt1"> à s'enregistrer ?</span>
				</div>
				<br />

				<div className="text-center p-t-136">
					<Link to="/">
						<i className=" m-l-5" aria-hidden="true">
							<BsArrowLeft />
						</i>{" "}
						S'autentifier avec un compte existant
					</Link>
				</div>
			</form>
		</>
	);
}
