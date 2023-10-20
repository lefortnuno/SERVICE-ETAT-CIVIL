import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `utilisateur/`;
let isValidate = false;
let i = 0;

export default function ModalEdition(props) {
	//#region // MES VARIABLES
	const identifiant = props.children;
	const u_info = getDataUtilisateur();
	const [inputs, setInputs] = useState({
		idUtilisateur: "",
		etatUtilisateur: "",
		identification: "",
	});
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		idUtilisateur: "",
		etatUtilisateur: "",
		identification: "",
	});
	//#endregion

	//#region // RECUPERER UN Arrondissement
	// FUNC POUR EVITER UNE BOUCLE INFINIE
	while (props.showEdit && i === 0) {
		if (i !== 0) {
			break;
		}
		getOneUser(identifiant);
		i = 1;
	}

	function getOneUser(xid) {
		axios.get(URL_DE_BASE + `${xid}`, u_info.opts).then(function (response) {
			setInputs(response.data[0]);
			console.log(response.data[0]);
		});
	}
	//#endregion

	//#region // FONCTION DU BOUTTON ENREGISTRER
	const onSubmit = (identifiant) => {
		console.log(inputs.etatUtilisateur);
		axios
			.put(URL_DE_BASE + `${identifiant}`, inputs, u_info.opts)
			.then(function (response) {
				if (response.status === 200) {
					toast.success("Modificatoin Reussi.");
					onClose();
				} else {
					toast.error("Echec de la Modification!");
				}
			});
	};
	//#endregion

	//#region // HANDLE CHANGE FONCTION
	const handleChange = (event) => {
		isValidate = true;
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		setInputs((values) => ({ ...values, [name]: value }));

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
		} else if (value.length > 10) {
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
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event, identifiant) => {
		event.preventDefault();
		// isValidate = true;

		const inputsArray = ["etatUtilisateur", "identification"];

		inputsArray.forEach((element) => {
			if (!inputs[element]) {
				setErreurs((values) => ({ ...values, [element]: true }));
				setMessages((values) => ({
					...values,
					[element]: "champ " + [element] + "  obligatoire",
				}));
				isValidate = false;
			}
		});

		if (isValidate) {
			onSubmit(identifiant);
		} else {
			toast.warning("Aucune modification apercu");
		}
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		props.onHide();
		i = 0;

		const inputsArray = ["idUtilisateur", "etatUtilisateur", "identification"];

		inputsArray.forEach((element) => {
			setInputs((values) => ({ ...values, [element]: "" }));
			inputs[element] = "";
			isValidate = false;
			setErreurs((values) => ({ ...values, [element]: false }));
		});
	}
	//#endregion

	const rowStyle = {
		marginTop: "1rem",
	};

	return (
		<>
			<Modal
				size="md"
				show={props.showEdit}
				onHide={props.closeEditModal}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title className="text-primary h6 md-6">
						:- ACTIVATION -:
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Row style={rowStyle}>
							<Col col="md-8" ml="auto">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput2"
								>
									<Form.Label>- Identifiant : </Form.Label>
									<Form.Control
										type="text"
										name="identification"
										onChange={handleChange}
										value={inputs.identification}
										placeholder="Identifiant"
										autoComplete="off"
									/>
									<small className="text-danger d-block">
										{erreurs.identification ? messages.identification : null}
									</small>
								</Form.Group>
							</Col>

							<Col col="md-8" ml="auto">
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput1"
								>
									<Form.Label>- Attribut du compte : </Form.Label>
									<Form.Control
										type="text"
										name="attribut"
										onChange={handleChange}
										value={inputs.attribut}
										autoComplete="off"
										placeholder="Attribut du compte"
										disabled={true}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row style={rowStyle}>
							<Col col="md-8" ml="auto" className="text-center">
								<Form.Label> Etat du Compte : </Form.Label>{" "}
								<Form.Select
									name="etatUtilisateur"
									onChange={handleChange}
									autoComplete="off"
									inline="true"
								>
									<option value={inputs.etatUtilisateur}>
										{inputs.etatUtilisateur === 1 ? "Activer" : "Non Activer"}
									</option>

									<option value={true}>Activer</option>

									<option value={false}>Non Activer</option>
								</Form.Select>
							</Col>
						</Row>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={onClose}>
						Annuler
					</Button>

					<Button
						variant="primary"
						onClick={(e) => validation(e, inputs.idUtilisateur)}
					>
						Enregistrer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
