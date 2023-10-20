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

const URL_BASE = `procedure_cin/`;
let i = 0;
let isValidate = false;

export default function ModalEdition(props) {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	const [inputs, setInputs] = useState({
		etatCin: "",
		numSeries: "",
		observation: "",
	});
	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState({
		etatCin: "",
		numSeries: "",
		observation: "",
	});

	const id = props.children;
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
		const dataInputs = Object.assign(
			{},
			{
				p_idUtilisateur: u_info.u_idUtilisateur,
				etatCin: inputs.etatCin,
				observation: inputs.observation,
				numSeries: inputs.numSeries,
				p_cin: inputs.p_cin,
			}
		);

		axios
			.put(URL_BASE + `${id}`, dataInputs, u_info.opts)
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
		const inputsObligatoire = ["numSeries", "observation", "etatCin"];
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
				size="md"
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
									<Form.Label>Etat du CIN :- </Form.Label>
									{" "}
									<Form.Select
										name="etatCin"
										onChange={handleChange}
										value={inputs.etatCin}
										autoComplete="off"
										inline="true"
									>
										<option value="PRIMA"> - PRIMA </option>
										<option value="USURE"> - USURE </option>
										<option value="PERTE"> - PERTE </option>
									</Form.Select>
								</Col>
							</Row>

							<Row style={rowStyle2}>
								<Col col="md-8" ml="auto">
									<Form.Label>Numéro CIN</Form.Label>
									<Form.Control
										type="number"
										min="0"
										// name="p_cin"
										// onChange={handleChange}
										value={inputs.p_cin}
										autoComplete="off"
										placeholder="Numéro CIN ...."
										inline="true"
										style={myColor}
										disabled={true}
									/>
									<small className="text-danger d-block">
										{erreurs.p_cin ? messages.p_cin : null}
									</small>
								</Col>
								<Col col="md-8" ml="auto">
									<Form.Label>Numéro de Series</Form.Label>
									<Form.Control
										type="text"
										name="numSeries"
										onChange={handleChange}
										value={inputs.numSeries}
										autoComplete="off"
										placeholder="Numéro de series ...."
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.numSeries ? messages.numSeries : null}
									</small>
								</Col>
							</Row>

							<Row style={rowStyle}>
								<Col>
									<Form.Control
										as="textarea"
										rows={2}
										name="observation"
										value={inputs.observation}
										onChange={handleChange}
										autoComplete="off"
										placeholder="Une observation à ajouter ? exemple : ''Bien ....'' "
										inline="true"
									/>
									<small className="text-danger d-block">
										{erreurs.observation ? messages.observation : null}
									</small>
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
