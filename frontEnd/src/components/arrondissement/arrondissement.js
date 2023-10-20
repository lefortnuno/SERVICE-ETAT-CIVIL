import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare, BsSearch } from "react-icons/bs";

import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";

import DeleteConfirmation from "../../contexts/ModalSuppr";

const URL_DE_BASE = `arrondissement/`;

export default function Arrondissement() {
	//#region // MES VARIABLE
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const u_info = getDataUtilisateur();
	//#endregion

	//#region // DONNEE  Arrondissement
	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
			setUsers(response.data);
		});
	}
	//#endregion

	//#region // MODAL DELETE  Arrondissement
	const [id, setId] = useState(null);
	const [displayConfirmationModal, setDisplayConfirmationModal] =
		useState(false);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const showDeleteModal = (id) => {
		setId(id);
		setDeleteMessage(
			`Etes vous sure de vouloir supprimer '${
				users.find((x) => x.idArrondissement === id).nomArrondissement
			}'?`
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
		});
	};
	//#endregion

	//#region // ----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(true);
	function rechercheArrondissement(event) {
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

	//#region // MODAL AJOUT Arrondissement
	const [show, setShow] = useState(false);
	const showAddModal = () => setShow(true);
	const closeAddModal = () => {
		getUsers();
		setShow(false);
	};
	//#endregion

	//#region // MODAL EDIT Arrondissement
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
			<div className="wrapper">
				<ModalAjout show={show} onHide={closeAddModal} />

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

				<div className="main-header">
					<LogoContext />

					<nav className="navbar navbar-header navbar-expand-lg">
						<div className="container-fluid">
							<form
								class="navbar-left navbar-form nav-search mr-md-3"
								action=""
							>
								<div className="input-group">
									<input
										type="number_format"
										maxLength="40"
										className="form-control"
										onClick={retourALaPremierPage}
										onChange={rechercheArrondissement}
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
								<button
									type="button"
									onClick={showAddModal}
									className="btn btn-success"
								>
									<i className="mdi mdi-plus-circle"></i> Nouveau
								</button>
							</div>

							<div className="row">
								<div className="col-xl-6 stretch-card grid-margin">
									<div className="table-responsive text-nowrap">
										<h4 className="text-center"> Liste des Arrondissements </h4>
										<br />
										<table className="table table-striped w-auto">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Nom Arrondissement</th>
													<th scope="col">Adress Arrondissement</th>
													<th scope="col">Actions</th>
												</tr>
											</thead>
											<tbody>
												{contenuTab || users.length !== 0 ? (
													currentItems.map((user, key) => (
														<tr key={key}>
															<th scope="row">{user.idArrondissement} </th>
															<td>{user.nomArrondissement}</td>
															<td>{user.adressArrondissement}</td>
															<td>
																<button
																	type="button"
																	className="btn btn-outline-primary btn-sm m-1 waves-effect"
																	variant="default"
																	name="numCompteEdit"
																	onClick={() =>
																		showEditModal(user.idArrondissement)
																	}
																>
																	<BsPencilSquare />
																</button>

																<button
																	type="button"
																	className="btn btn-outline-danger btn-sm m-1 waves-effect"
																	variant="default"
																	onClick={() =>
																		showDeleteModal(user.idArrondissement)
																	}
																>
																	<BsFillTrashFill />
																</button>
															</td>
														</tr>
													))
												) : (
													<tr>
														<td colSpan={3} className="text-danger text-center">
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

							{/* JE COMMENCE A MODIFIER ICI */}
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
