import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../contexts/ModalSuppr";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
	BsFillTrashFill,
	BsPencilSquare,
	BsSearch,
	BsFillPersonCheckFill,
} from "react-icons/bs";

const URL_DE_BASE = `utilisateur/`;

export default function Utilisateur() {
	//#region // MES VARIABLE
	const navigate = useNavigate();
	const u_info = getDataUtilisateur();
	const [users, setUsers] = useState([]);
	//#endregion

	//#region // DONNEE UTILISATEUR
	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
			setUsers(response.data);
		});
	}
	//#endregion

	//#region // MODAL DELETE UTILISATEUR
	const [id, setId] = useState(null);
	const [displayConfirmationModal, setDisplayConfirmationModal] =
		useState(false);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const showDeleteModal = (id) => {
		setId(id);
		setDeleteMessage(
			`Supprimer le compte utilisateur :  ${
				users.find((x) => x.idUtilisateur === id).identification
			} définitivement?`
		);
		setDisplayConfirmationModal(true);
	};

	const hideConfirmationModal = () => {
		setDisplayConfirmationModal(false);
	};

	const submitDelete = (id) => {
		axios.delete(URL_DE_BASE + `${id}`, u_info.opts).then(function (response) {
			getUsers();
			toast.success(`Suppr Reussi`);
			setDisplayConfirmationModal(false);

			if (id === u_info.u_numCompte) {
				localStorage.clear();
				navigate("/");
			}
		});
	};
	//#endregion

	//#region // ----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(true);
	function rechercheUtilisateur(event) {
		const valeur = event.target.value;
		if (!valeur) {
			getUsers();
			setContenuTab(true);
		} else {
			axios.get(URL_DE_BASE + `recherche/${valeur}`).then((response) => {
				if (response.data.success) {
					setUsers(response.data.res);
					setContenuTab(true);
				} else {
					setUsers(response.data.res);
					setContenuTab(false);
				}
			});
		}
	}
	//#endregion

	//#region  //----- MY PAGINATION -----
	const [currentPage, setcurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);

	const [pageNumberLimit, setPageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const handleClick = (event) => {
		setcurrentPage(Number(event.target.id));
	};

	function retourALaPremierPage() {
		setcurrentPage(1);
		if (currentPage > 5) {
			setmaxPageNumberLimit(5);
			setminPageNumberLimit(0);
		}
	}

	const pages = [];
	const nbrPage = Math.ceil(users.length / itemsPerPage);
	for (let i = 1; i <= nbrPage; i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage == number ? "active" : null}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	const handleNextbtn = () => {
		setcurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevbtn = () => {
		setcurrentPage(currentPage - 1);
		if (currentPage - 2 < minPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};
	//#endregion

	//#region // MODAL EDIT USER
	const [numCompteEdit, setNumCompteEdit] = useState("");
	const [showEdit, setShowEdit] = useState(false);
	const showEditModal = (numCompte) => {
		setNumCompteEdit(numCompte);
		setShowEdit(true);
	};
	const closeEditModal = () => {
		getUsers();
		setShowEdit(false);
	};
	//#endregion

	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<ModalEdition showEdit={showEdit} onHide={closeEditModal}>
				{numCompteEdit}
			</ModalEdition>

			<DeleteConfirmation
				showModal={displayConfirmationModal}
				confirmModal={submitDelete}
				hideModal={hideConfirmationModal}
				id={id}
				message={deleteMessage}
			/>

			<div className="wrapper">
				<div className="main-header">
					<LogoContext />

					<nav className="navbar navbar-header navbar-expand-lg">
						<div className="container-fluid">
							<form
								className="navbar-left navbar-form nav-search mr-md-3"
								action=""
							>
								<div className="input-group">
									<input
										type="number_format"
										maxLength="20"
										className="form-control"
										onClick={retourALaPremierPage}
										onChange={rechercheUtilisateur}
										placeholder="Recherche ...."
										autoComplete="off"
									/>
									<div className="input-group-append">
										<span className="input-group-text">
											<i className="mt-2">
												<BsSearch />
											</i>
										</span>
									</div>
								</div>
							</form>

							<HeaderContext />
						</div>
					</nav>
				</div>

				<SideBarContext />

				<div className="main-panel">
					<div className="content">
						<div className="container-fluid">
							<div className="row mb-3">
								<Link to="/newUtilisateur/">
									<button type="button" className="btn btn-success">
										Nouveau
									</button>
								</Link>
							</div>

							<div className="row">
								<div className="col-xl-9 stretch-card grid-margin">
									<div className="table-responsive text-nowrap">
										<h4 className="text-center"> Liste des Utilisateurs </h4>
										<br />
										<table className="table table-striped w-auto">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Identification</th>
													<th scope="col">Role</th>
													<th scope="col">Etat du Compte</th>
													<th scope="col">Actions</th>
													<th scope="col">Activation</th>
												</tr>
											</thead>
											<tbody>
												{contenuTab || users.length !== 0 ? (
													currentItems.map((user, key) => (
														<tr key={key}>
															<th scope="row">{user.idUtilisateur} </th>
															<td>{user.identification}</td>
															<td>{user.attribut}</td>
															<td>
																{user.etatUtilisateur === 1
																	? "Activer"
																	: "Non Activer"}
															</td>
															<td>
																<Link
																	to={`./UEdition/${user.idUtilisateur}`}
																	type="button"
																	className="btn btn-outline-primary btn-sm m-1 waves-effect"
																	variant="default"
																	name="numeroIdentification"
																>
																	<BsPencilSquare />
																</Link>
																<button
																	type="button"
																	className="btn btn-outline-danger btn-sm m-1 waves-effect"
																	variant="default"
																	onClick={() =>
																		showDeleteModal(user.idUtilisateur)
																	}
																>
																	<BsFillTrashFill />
																</button>
															</td>
															<td>
																<button
																	type="button"
																	className="btn btn-outline-success btn-sm m-1 waves-effect"
																	variant="default"
																	name="numCompteEdit"
																	onClick={() =>
																		showEditModal(user.idUtilisateur)
																	}
																>
																	<BsFillPersonCheckFill className="mt-1" />
																</button>
															</td>
														</tr>
													))
												) : (
													<tr>
														<td colSpan={5} className="text-danger text-center">
															La liste est vide ....
														</td>
													</tr>
												)}
											</tbody>
										</table>

										{nbrPage !== 1 && nbrPage !== 0 && users.length !== 0 ? (
											<>
												<ul className="pageNumbers">
													<li>
														<button
															disabled={currentPage == pages[0] ? true : false}
															onClick={handlePrevbtn}
														>
															Précédent
														</button>
													</li>
													{renderPageNumbers}
													<li>
														<button
															disabled={
																currentPage == pages[pages.length - 1]
																	? true
																	: false
															}
															onClick={handleNextbtn}
														>
															Suivant
														</button>
													</li>
												</ul>
												<br />
											</>
										) : null}
										<br />
									</div>
								</div>
							</div>
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
