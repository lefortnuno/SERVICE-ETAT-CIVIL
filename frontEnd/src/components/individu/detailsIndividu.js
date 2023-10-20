import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { toast } from "react-toastify";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { BsReplyFill, BsPrinterFill, BsSearch } from "react-icons/bs";

const URL_BASE = `individu/`;

export default function DetailsIndividu() {
	const { cin } = useParams();

	const navigate = useNavigate();
	const u_info = getDataUtilisateur();
	const [inputs, setInputs] = useState([]);

	const compRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => compRef.current,
		documentTitle: "Imprimer le document",
		onAfterPrint: () => toast.success("Impression Reussi."),
	});

	const handlePage = () => {
		navigate("/individu/");
	};

	useEffect(() => {
		getOneUser();
	}, []);

	//#region // RECUPERER UN INDIVIDU
	function getOneUser() {
		axios.get(URL_BASE + `${cin}`).then(function (response) {
			setInputs(response.data[0]);
			console.log("response : ", response);
		});
	}
	//#endregion

	//#region // RENDU HTML ----
	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<div className="wrapper">
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
										type="text"
										className="form-control"
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
							<div className="row">
								<div className="col-xl-12 stretch-card grid-margin">
									<div className="table-responsive text-nowrap">
										<div className="row mb-3">
											<div className="col-2">
												<h4 className="text-center">
													<BsReplyFill
														onClick={handlePage}
														className="text-danger"
														style={{ cursor: "pointer" }}
													/>
												</h4>
											</div>
											<div className="col-8">
												<h4 className="text-center">Details Sur Un Individu</h4>
											</div>
											<div className="col-2">
												<h4 className="text-center">
													<BsPrinterFill
														onClick={handlePrint}
														className="text-success"
														style={{ cursor: "pointer" }}
													/>
												</h4>
											</div>
										</div>

										{inputs ? (
											<div className="container_bg">
												<div
													className="box_bg_card"
													style={{
														backgroundImage: `url('../picture/images/cin_recto_verso.png')`,
														backgroundSize: "contain",
														backgroundPosition: "top",
														backgroundRepeat: "no-repeat",
													}}
												>
													<div className="row">
														<div className="col-6 col_left">
															<div className="col-12 anarana_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.nom}
																	</span>
																</div>
															</div>

															<div className="col-12 fanampiny_anarana_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.prenom}
																	</span>
																</div>
															</div>

															<div className="col-12 teraka_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.datenais}
																	</span>
																</div>
															</div>

															<div className="col-12 lieu_naissance_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.lieunais}
																	</span>
																</div>
															</div>

															<div className="col-12 signe_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.cicatrice}
																	</span>
																</div>
															</div>

															<div className="col-12 height_row">
																<div className=" value_text">
																	<span className="value_name">
																		H : {inputs.longueur} m
																	</span>
																</div>
															</div>

															<div className="col-12 num_cin_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.cin}
																	</span>
																</div>
															</div>
														</div>

														{/* <!--               DROITE--> */}
														<div className="col-6">
															<div className="col-12 fonenana_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.domicile}
																	</span>
																</div>
															</div>

															<div className="col-12 boribory_tany_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.nomArrondissement}
																	</span>
																</div>
															</div>

															<div className="col-12 asa_atao_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.nomProfession}
																	</span>
																</div>
															</div>

															<div className="col-12 ray_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.nomPere ? (
																			<>{inputs.nomPere}</>
																		) : (
																			"/"
																		)}
																	</span>
																</div>
															</div>

															<div className="col-12 reny_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.nomMere ? (
																			<>{inputs.nomMere}</>
																		) : (
																			"/"
																		)}
																	</span>
																</div>
															</div>

															<div className="col-12 natao_tao_row">
																<div className=" value_text">
																	<span className="value_name">
																		Fianarantsoa
																	</span>
																</div>
															</div>

															<div className="col-12 tamin_ny_row">
																<div className=" value_text">
																	<span className="value_name">
																		{inputs.datelivrance}
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										) : (
											<>
												<div className="row">
													<div className="col-md-12">
														<div className="card ">
															<div className="card-header ">
																<h4 className="card-title text-center">
																	INDIVIDU INTROUVABLE
																</h4>
															</div>
															<img
																src={
																	process.env.PUBLIC_URL +
																	`/picture/pageNotFound/page-not-found.svg`
																}
																style={{ width: "60%" }}
															/>
														</div>
													</div>
												</div>
											</>
										)}
									</div>
								</div>
							</div>

							<div className="row mt-3">
								<div className="col-md-6">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title text-center">
												FICHE MERE FACE
											</h4>
										</div>
										<img
											src={
												process.env.PUBLIC_URL +
												`/pic-fiche-mere/frontEnd/${inputs.imgFaceFM}`
											}
											style={{ width: "100%", height: "100%" }}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="card">
										<div className="card-header ">
											<h4 className="card-title text-center">FICHE MERE DOS</h4>
										</div>
										<img
											src={
												process.env.PUBLIC_URL +
												`/pic-fiche-mere/backEnd/${inputs.imgDosFM}`
											}
											style={{ width: "100%", height: "100%" }}
										/>
									</div>
								</div>
							</div>

							<div className="" hidden={true}>
								{inputs ? (
									<div className="container_bg" ref={compRef}>
										<div
											className="box_bg_card"
											// style={{
											// 	backgroundImage: `url('../picture/images/cin_recto_verso.png')`,
											// 	backgroundSize: "contain",
											// 	backgroundPosition: "top",
											// 	backgroundRepeat: "no-repeat",
											// }}
										>
											<div className="row">
												<div className="col-6 col_left">
													<div className="col-12 anarana_row">
														<div className=" value_text">
															<span className="value_name">{inputs.nom}</span>
														</div>
													</div>

													<div className="col-12 fanampiny_anarana_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.prenom}
															</span>
														</div>
													</div>

													<div className="col-12 teraka_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.datenais}
															</span>
														</div>
													</div>

													<div className="col-12 lieu_naissance_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.lieunais}
															</span>
														</div>
													</div>

													<div className="col-12 signe_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.cicatrice === "Aucune" ||
																inputs.cicatrice ? (
																	" / "
																) : (
																	<>{inputs.cicatrice}</>
																)}
															</span>
														</div>
													</div>

													<div className="col-12 height_row">
														<div className=" value_text">
															<span className="value_name">
																H : {inputs.longueur} m
															</span>
														</div>
													</div>

													<div className="col-12 num_cin_row">
														<div className=" value_text">
															<span className="value_name">{inputs.cin}</span>
														</div>
													</div>
												</div>

												{/* <!--               DROITE--> */}
												<div className="col-6">
													<div className="col-12 fonenana_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.domicile}
															</span>
														</div>
													</div>

													<div className="col-12 boribory_tany_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.nomArrondissement}
															</span>
														</div>
													</div>

													<div className="col-12 asa_atao_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.nomProfession}
															</span>
														</div>
													</div>

													<div className="col-12 ray_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.nomPere ? <>{inputs.nomPere}</> : "/"}
															</span>
														</div>
													</div>

													<div className="col-12 reny_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.nomMere ? <>{inputs.nomMere}</> : "/"}
															</span>
														</div>
													</div>

													<div className="col-12 natao_tao_row">
														<div className=" value_text">
															<span className="value_name">Fianarantsoa</span>
														</div>
													</div>

													<div className="col-12 tamin_ny_row">
														<div className=" value_text">
															<span className="value_name">
																{inputs.dateLivrance2}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
	//#endregion
}
