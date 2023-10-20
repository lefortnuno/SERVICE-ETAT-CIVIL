import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { BsReplyFill } from "react-icons/bs";

const URL_DE_BASE = `individu/`;
const URL_DE_FACE = URL_DE_BASE + `imageFaceFM/`;
const URL_DE_DOS = URL_DE_BASE + `imageDosFM/`;

let isValidate = false;

export default function FormFicheMerePic() {
	//#region // MES VARIABLES
	const { cin } = useParams();
	const u_info = getDataUtilisateur();
	const navigate = useNavigate();

	const mesInputs = {
		cin: "",
	};

	const [inputs, setInputs] = useState(mesInputs);

	const [picFMFace, setPicFMFace] = useState({
		file: [],
		filepreview: null,
	});
	const [picFMDos, setPicFMDos] = useState({
		file: [],
		filepreview: null,
	});

	const [erreurs, setErreurs] = useState([]);
	const [messages, setMessages] = useState(mesInputs);
	//#endregion

	useEffect(() => {
		getOneUser();
	}, []);

	//#region // RECUPERER UN INDIVIDU
	function getOneUser() {
		axios.get(URL_DE_BASE + `${cin}`).then(function (response) {
			setInputs(response.data[0]);
		});
	}
	//#endregion

	//#region // HANDLE CHANGE IMAGE FUNC
	const handlePictureFMFace = (event) => {
		setPicFMFace({
			...picFMFace,
			file: event.target.files[0],
			filepreview: URL.createObjectURL(event.target.files[0]),
		});
		setErreurs((values) => ({ ...values, imgFaceFM: false }));
		setMessages((values) => ({
			...values,
			imgFaceFM: "",
		}));
		isValidate = true;
	};
	//#endregion

	//#region // HANDLE CHANGE IMAGE FUNC
	const handlePictureFMDos = (event) => {
		setPicFMDos({
			...picFMDos,
			file: event.target.files[0],
			filepreview: URL.createObjectURL(event.target.files[0]),
		});
		setErreurs((values) => ({ ...values, imgDosFM: false }));
		setMessages((values) => ({
			...values,
			imgDosFM: "",
		}));
		isValidate = true;
	};
	//#endregion

	//#region //VALIDATION FORMULAIRE
	const validation = (event) => {
		event.preventDefault();

		if (picFMFace.file.length === 0) {
			isValidate = false;
			setErreurs((values) => ({ ...values, imgFaceFM: true }));
			setMessages((values) => ({
				...values,
				imgFaceFM: " champ obligatoire",
			}));
		}

		if (picFMDos.file.length == 0) {
			setErreurs((values) => ({ ...values, imgDosFM: true }));
			setMessages((values) => ({
				...values,
				imgDosFM: " champ obligatoire",
			}));
			isValidate = false;
		}

		console.log(" --------- ", isValidate, " --------------");
		if (isValidate) {
			ajoutPhotoFMFace();
			ajoutPhotoFMDos();
		} else {
			toast.warn("Verifier les champs!");
		}
	};
	//#endregion

	//#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
	const ajoutPhotoFMFace = async () => {
		const formdata = new FormData();
		formdata.append("imgFaceFM", picFMFace.file);

		axios
			.put(URL_DE_FACE + `${cin}`, formdata, u_info.opts, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				if (res.data.success) {
					toast.success("Ajout photo de face reussi.");
					onClose();
				}
			});
	};
	//#endregion

	//#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
	const ajoutPhotoFMDos = async () => {
		const formdata = new FormData();
		formdata.append("imgDosFM", picFMDos.file);

		axios
			.put(URL_DE_DOS + `${cin}`, formdata, u_info.opts, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				if (res.data.success) {
					toast.success("Ajout photo de dos reussi.");
					onClose();
				}
			});
	};
	//#endregion

	//#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
	function onClose() {
		picFMFace.file = [];
		picFMDos.file = [];
		navigate("/individu/");
	}
	//#endregion

	//#region // RENDU HTML ----
	return (
		<>
			<div className="row">
				<div className="monContainer">
					<header>Photo du Fiche Mère de l'individu</header>

					<form>
						<div className="form first">
							<div className="details personal">
								<div className="fields">
									<div className="input-field">
										<label>Numéro de CIN :</label>
										<input
											type="number"
											min="1"
											name="cin"
											value={inputs.cin}
											disabled={true}
											autoComplete="off"
											placeholder="Entrez le numéro de CIN"
										/>
										<small className="text-danger d-block">
											{erreurs.cin ? messages.cin : null}
										</small>
									</div>

									<div className="input-field">
										<label>Nom : </label>
										<input
											type="text"
											name="nom"
											value={inputs.nom}
											disabled={true}
											autoComplete="off"
											placeholder="Nom "
										/>
										<small className="text-danger d-block">
											{erreurs.nom ? messages.nom : null}
										</small>
									</div>

									<div className="input-field">
										<label>Prenom : </label>
										<input
											type="text"
											name="prenom"
											value={inputs.prenom}
											disabled={true}
											autoComplete="off"
											placeholder="lieu de naissance"
										/>
										<small className="text-danger d-block">
											{erreurs.prenom ? messages.prenom : null}
										</small>
									</div>
								</div>
							</div>

							<div className="details ID">
								<div className="fields">
									<div
										className="input-field monPhotoPDP login100-pic js-tilt "
										data-tilt
									>
										{!picFMFace.filepreview ? (
											<img
												src={
													process.env.PUBLIC_URL + `/picture/images/img-01.png`
												}
												alt="image"
												style={{ width: "150px", height: "150px" }}
											/>
										) : (
											<img
												src={picFMFace.filepreview}
												alt="image"
												style={{
													width: "150px",
													height: "150px",
													borderRadius: "4%",
												}}
											/>
										)}

										<label>Photo face du fiche Mère : </label>
										<input
											type="file"
											name="imgFaceFM"
											onChange={handlePictureFMFace}
											autoComplete="off"
											placeholder="Photo"
										/>
										<small className="text-danger d-block">
											{erreurs.imgFaceFM ? messages.imgFaceFM : null}
										</small>
									</div>

									<div
										className="input-field monPhotoPDP login100-pic js-tilt "
										data-tilt
									>
										{!picFMDos.filepreview ? (
											<img
												src={
													process.env.PUBLIC_URL + `/picture/images/img-01.png`
												}
												alt="image"
												style={{ width: "150px", height: "150px" }}
											/>
										) : (
											<img
												src={picFMDos.filepreview}
												alt="image"
												style={{
													width: "150px",
													height: "150px",
													borderRadius: "4%",
												}}
											/>
										)}

										<label>Photo dos du fiche Mère : </label>
										<input
											type="file"
											name="imgDosFM"
											onChange={handlePictureFMDos}
											autoComplete="off"
											placeholder="Photo"
										/>
										<small className="text-danger d-block">
											{erreurs.imgDosFM ? messages.imgDosFM : null}
										</small>
									</div>
								</div>
							</div>

							<br />
							<div className="">
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
