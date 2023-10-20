import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getDataUtilisateur from "../../api/udata";

const URL_BASE = `individu/`;
const URL_DE_BASEP = `profession/`;
const URL_DE_BASEA = `arrondissement/`;
const URL_DE_BASEO = `origine/`;

let i = 0;
let isValidate = false;

export default function ModalEditionIndividu(props) {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();

	const mesInputs = {
		cin: "",
		nom: "",
		prenom: "",
		nomPere: "",
		nomMere: "",
		lieunais: "",
		domicile: "",
		cicatrice: "",
		longueur: "",
	};
	const metier = {
		p_idProfession: "",
		nomProfession: "",
	};
	const fiaviana = {
		p_idOrigine: "",
		nomOrigine: "",
	};
	const bureau = {
		p_idArrondissement: "",
		nomArrondissement: "",
		adressArrondissement: "",
	};

	const [inputs, setInputs] = useState(mesInputs);
	const [donneeP, setDonneeP] = useState([metier]);
	const [donneeA, setDonneeA] = useState([bureau]);
	const [donneeO, setDonneeO] = useState([fiaviana]);

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState(mesInputs);

	const id = props.children;
	//#endregion

	//#region // MES FUNCTION
	useEffect(() => {
		getUsersP();
		getUsersA();
		getUsersO();
	}, []);

	const getUsersP = async () => {
		const result = await axios
			.get(URL_DE_BASEP, u_info.opts)
			.then(function (response) {
				setDonneeP(response.data);
			});
	};

	const getUsersA = async () => {
		const result = await axios
			.get(URL_DE_BASEA, u_info.opts)
			.then(function (response) {
				setDonneeA(response.data);
			});
	};

	const getUsersO = async () => {
		const result = await axios
			.get(URL_DE_BASEO, u_info.opts)
			.then(function (response) {
				setDonneeO(response.data);
			});
	};
	//#endregion

	//#region // FUNC POUR EVITER UNE BOUCLE INFINIE
	while (props.showEdit && i === 0) {
		if (i !== 0) {
			break;
		}
		getOneUser(id);
		i = 1;
	}
	//#endregion

	//#region // RECUPERER UN Procedure_cin
	function getOneUser(id) {
		axios.get(URL_BASE + `${id}`).then(function (response) {
			setInputs(response.data[0]); 
		});
	}
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

		if (name === "cicatrice" || name === "domicile" || name === "lieunais") {
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

		if (
			name === "nom" ||
			name === "prenom" ||
			name === "nomMere" ||
			name === "nomPere"
		) {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " obligatoire",
				}));
			} else if (value.length < 2) {
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

		if (name === "cin") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN obligatoire",
				}));
			} else if (value.length < 12) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: "Numéro de CIN trop court",
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

		if (name === "longueur") {
			if (value.length === 0) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " obligatoire",
				}));
			} else if (value < 0.7) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " anormale !",
				}));
			} else if (value > 2.2) {
				isValidate = false;
				setErreurs((values) => ({ ...values, [name]: true }));
				setMessages((values) => ({
					...values,
					[name]: [name] + " anormale !",
				}));
			} else {
				isValidate = true;
				setErreurs((values) => ({ ...values, [name]: false }));
				setMessages((values) => ({ ...values, [name]: "" }));
			}
		}
	};
	//#endregion

	//#region // FUNC BOUTTON CLOSE
	function onClose() {
		props.onHide();
		i = 0;
	}
	const rowStyle = {
		marginTop: "1rem",
	};
	const rowStyle2 = {
		marginTop: "2rem",
	};
	const myColor = { color: "blue" };
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = () => {
		axios
			.put(URL_BASE + `${id}`, inputs, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					if (response.data.success) {
						toast.success("Modification Reussi.");

						onClose();
					} else {
						toast.error("Echec de la Modification !");
						onClose();
					}
				} else {
					toast.error("Echec de la Modification !");
				}
			});
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();
		const inputsObligatoire = [
			"cin",
			"nom",
			"prenom",
			"nomPere",
			"nomMere",
			"lieunais",
			"domicile",
			"cicatrice",
			"longueur",
		];

		let areValidate = true;

		inputsObligatoire.forEach((element) => {
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
				areValidate = false;
			}
		});

		if (areValidate) {
			isValidate = areValidate;
		}

		console.log(" --------- ", isValidate, " --------------"); 
		if (isValidate) {
			onSubmit();
		} else {
			toast.warn("Verifier les champs!");
		}
	};
	//#endregion

	//#region // RENDU HTML MODAL EDITER
	return (
		<>
			<Modal
				size="lg"
				show={props.showEdit}
				onHide={props.closeEditModal}
				backdrop="static"
				keyboard={false}
			>
				<Form>
					<Modal.Header>
						<h4> Modification</h4>
					</Modal.Header>

					<Modal.Body>
						<Container>
							<Row>
								<Col col="md-8" ml="auto">
									<Form.Label>Numéro CIN : </Form.Label>
									<Form.Control
										type="number"
										min="0"
										name="cin"
										onChange={handleChange}
										value={inputs.cin}
										autoComplete="off"
										placeholder="Numéro CIN ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.cin ? messages.cin : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Nom : </Form.Label>
									<Form.Control
										type="text"
										name="nom"
										onChange={handleChange}
										value={inputs.nom}
										autoComplete="off"
										placeholder="Nom ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.nom ? messages.nom : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Prénom : </Form.Label>
									<Form.Control
										type="text"
										name="prenom"
										onChange={handleChange}
										value={inputs.prenom}
										autoComplete="off"
										placeholder="Prénom ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.prenom ? messages.prenom : null}
									</small>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col col="md-8" ml="auto">
									<Form.Label>Nom du Père : </Form.Label>
									<Form.Control
										type="text"
										name="nomPere"
										onChange={handleChange}
										value={inputs.nomPere}
										autoComplete="off"
										placeholder="Nom du Père ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.nomPere ? messages.nomPere : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Nom de la Mère : </Form.Label>
									<Form.Control
										type="text"
										name="nomMere"
										onChange={handleChange}
										value={inputs.nomMere}
										autoComplete="off"
										placeholder="Nom de la Mère ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.nomMere ? messages.nomMere : null}
									</small>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col col="md-8" ml="auto">
									<Form.Label>Domicile : </Form.Label>
									<Form.Control
										type="text"
										name="domicile"
										onChange={handleChange}
										value={inputs.domicile}
										autoComplete="off"
										placeholder="Domicile ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.domicile ? messages.domicile : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Lieu de naissance : </Form.Label>
									<Form.Control
										type="text"
										name="lieunais"
										onChange={handleChange}
										value={inputs.lieunais}
										autoComplete="off"
										placeholder="lieunais ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.lieunais ? messages.lieunais : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Longueur en mètre: </Form.Label>
									<Form.Control
										type="number"
										min="0"
										name="longueur"
										onChange={handleChange}
										value={inputs.longueur}
										autoComplete="off"
										placeholder=" Longueur ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.longueur ? messages.longueur : null}
									</small>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col col="md-8" ml="auto">
									<Form.Label>Date de naissance : </Form.Label>
									<Form.Control
										type="text"
										name="datenais"
										onChange={handleChange}
										value={inputs.datenais}
										autoComplete="off"
										placeholder="Nom du Père ...."
										inline="true"
										disabled={true}
									/>
									<small className="text-danger d-block">
										{erreurs.datenais ? messages.datenais : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Cicatrice : </Form.Label>
									<Form.Control
										type="text"
										name="cicatrice"
										onChange={handleChange}
										value={inputs.cicatrice}
										autoComplete="off"
										placeholder="Nom de la Mère ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.cicatrice ? messages.cicatrice : null}
									</small>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col col="md-8" ml="auto">
									<Form.Label> Profession exercer : </Form.Label>
									<Form.Select
										name="p_idProfession"
										onChange={handleChange}
										autoComplete="off"
										inline="true"
									>
										<option value={inputs.idProfession}>
											{inputs.nomProfession}
										</option>

										{donneeP.map((d, index) => (
											<option value={d.idProfession} key={index}>
												{d.nomProfession}
											</option>
										))}
									</Form.Select>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label> Origine ethnique : </Form.Label>
									<Form.Select
										name="p_idOrigine"
										onChange={handleChange}
										autoComplete="off"
										inline="true"
									>
										<option value={inputs.idOrigine}>
											{inputs.nomOrigine}
										</option>

										{donneeO.map((d, index) => (
											<option value={d.idOrigine} key={index}>
												{d.nomOrigine}
											</option>
										))}
									</Form.Select>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label> Arrondissement : </Form.Label>
									<Form.Select
										name="p_idArrondissement"
										onChange={handleChange}
										autoComplete="off"
										inline="true"
									>
										<option value={inputs.idArrondissement}>
											{inputs.nomArrondissement}
										</option>

										{donneeA.map((d, index) => (
											<option value={d.idArrondissement} key={index}>
												{d.nomArrondissement}
											</option>
										))}
									</Form.Select>
								</Col>
							</Row>
						</Container>
					</Modal.Body>
				</Form>

				<Modal.Footer>
					<Button variant="danger" onClick={onClose}>
						Annuler
					</Button>

					<Button variant="primary" onClick={validation}>
						Enregistrer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
	//#endregion
}
