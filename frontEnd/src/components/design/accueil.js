import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { BsSearch } from "react-icons/bs";

const URL_DE_BASE = `arrondissement/`;

export default function Accueil() {
	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}
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
										maxLength="0"
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
							{/* AJOUT DE NOUVEAU ELEMENT POSSIBLE */}

							<div className="row">
								<div className="col-md-3">
									<div className="card card-stats card-info">
										<img
											src={process.env.PUBLIC_URL + `/picture/fanjakana.jpg`}
											alt="pdp"
											style={{
												width: "100%",
												height: "100%",
												borderRadius: "0%",
											}}
										/>
									</div>
								</div>

								{/* <div className="col-md-3">
                  <div className="card card-stats">
                    <div className="card-body">
                      <p className="fw-bold mt-1">Actualiser Stat </p>
                      <div className="row mb-3">
                        <div className="col-4">
                          <div className="icon-big text-center icon-warning">
                            <i className="la la-pie-chart text-warning"></i>
                          </div>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <div className="numbers">
                            <p className="card-category">Nombre personne </p>
                            <h4 className="card-title">150 p</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="progress-card">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="text-muted">Open Rate</span>
                          <span className="text-muted fw-bold"> 60%</span>
                        </div>
                        <div
                          className="progress mb-2"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="60%"
                          ></div>
                        </div>
                      </div>
                      <div className="progress-card">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="text-muted">Open Rate</span>
                          <span className="text-muted fw-bold"> 60%</span>
                        </div>
                        <div
                          className="progress mb-2"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="60%"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="progress-card">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="text-muted">Open Rate</span>
                          <span className="text-muted fw-bold"> 60%</span>
                        </div>
                        <div
                          className="progress mb-2"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="60%"
                          ></div>
                        </div>
                      </div>
                      <div className="progress-card">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="text-muted">Open Rate</span>
                          <span className="text-muted fw-bold"> 60%</span>
                        </div>
                        <div
                          className="progress mb-2"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="60%"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-header">
											<h4 className="card-title text-center">
												Prefecture de Fianarantsoa
											</h4>
											<p className="card-category">
												La Prefecture de Fianarantsoa est une administration
												publique situee dans la ville de Fianarantsoa, dans le
												Sud de Madagascar. Elle est chargee de l'application des
												lois et des politiques publiques dans la region, ainsi
												que la gestion des services locaux. La prefecture de
												Fianarantsoa est responsable de la mise en oeuvre des
												programmes et des projets de developpement dans la
												region. Elle joue egalement un role de representation de
												l'Etat aupres de la population de la region.
											</p>
										</div>
										{/* <div className="card-body"> */}
										<img
											src={process.env.PUBLIC_URL + `/picture/Prefecture.jpg`}
											alt="pdp"
											style={{
												width: "100%",
												height: "100%",
												borderRadius: "0%",
											}}
										/>
										{/* </div> */}
									</div>
								</div>
							</div>

							{/* AJOUT DE NOUVEAU ELEMENT POSSIBLE */}
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
