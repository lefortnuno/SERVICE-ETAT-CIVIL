import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";
import FormulaireAjoutIndividu from "./Formulaire.ajout.individu";

import { BsSearch } from "react-icons/bs";

export default function AjoutIndividu() {
	//#region // MES VARIABLES
	const u_info = getDataUtilisateur();
	//#endregion

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
					<FormulaireAjoutIndividu />

					<FooterContext />
				</div>
			</div>
		</>
	);
}
