import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";
import FormFicheMerePic from "./FormulairePicFicheMere";
import {  BsSearch } from "react-icons/bs";

export default function FicheMerePic() {
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
							<FormFicheMerePic />
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
