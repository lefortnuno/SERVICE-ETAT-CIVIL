import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { useReactToPrint } from "react-to-print";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
	BsSearch,
	BsPencilSquare,
	BsReplyFill,
	BsPrinterFill,
} from "react-icons/bs";

import ModalEdition from "./ModalEdit";

const URL_DE_BASE = `procedure_cin/`;

export default function Procedure_cin() {
	//#region // MES VARIABLE
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const u_info = getDataUtilisateur();
	//#endregion

	//#region // DONNEE  Procedure_cin
	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
			setUsers(response.data);
		});
	}
	//#endregion

	//#region   //----- MA RECHERCHE -----
	const [contenuTab, setContenuTab] = useState(false);
	function rechercheElement(event) {
		const valeur = event.target.value;
		const valeurRecherche = {
			value: valeur,
		};

		if (!valeur) {
			getUsers();
			setContenuTab(false);
		} else {
			axios
				.post(URL_DE_BASE + `recherche/`, valeurRecherche, u_info.opts)
				.then((response) => {
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

	//#region // MODAL EDIT Procedure_cin
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

	const compRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => compRef.current,
		documentTitle: "Imprimer le document",
		onAfterPrint: () => toast.success("Impression Reussi."),
	});

	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}
			<div className="wrapper">
				<ModalEdition showEdit={showEdit} onHide={closeEditModal}>
					{numCompteEdit}
				</ModalEdition>

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
										onChange={rechercheElement}
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
								<Link to="/newProcedure/">
									<button type="button" className="btn btn-success">
										<i className="mdi mdi-plus-circle"></i> Nouveau
									</button>
								</Link>
							</div>

							<div className="row">
								<div
									className="col-xl-12 stretch-card grid-margin"
									ref={compRef}
								>
									<div className="table-responsive text-nowrap">
										<h4 className="text-center">
											Procedure e-CIN
											{" "}
											<BsPrinterFill
												onClick={handlePrint}
												className="text-success"
												style={{ cursor: "pointer" }}
											/>
										</h4>
										<br />
										<table className="table table-striped w-auto">
											<thead>
												<tr>
													<th scope="col"> N° </th>
													<th scope="col">EtatCin</th>
													<th scope="col">Numéro de CIN</th>
													<th scope="col">DateProcedure</th>
													<th scope="col">numSeries</th>
													<th scope="col">Observation</th>
													<th scope="col">Agent</th>
													<th scope="col">Actions</th>
												</tr>
											</thead>
											<tbody>
												{contenuTab || users.length !== 0 ? (
													currentItems.map((user, key) => (
														<tr key={key}>
															<th scope="row">{user.idProcedureCin} </th>
															<td>{user.etatCin}</td>
															<td>{user.p_cin}</td>
															<td>{user.dateProcedure}</td>
															<td>{user.numSeries}</td>
															<td>{user.observation}</td>
															<td>{user.identification}</td>
															<td>
																<button
																	type="button"
																	className="btn btn-outline-primary btn-sm m-1 waves-effect"
																	variant="default"
																	name="numCompteEdit"
																	onClick={() =>
																		showEditModal(user.idProcedureCin)
																	}
																>
																	<BsPencilSquare />
																</button>
															</td>
														</tr>
													))
												) : (
													<tr>
														<td colSpan={8} className="text-danger text-center">
															La liste est vide .....
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
