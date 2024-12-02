import FormulaireEnregistrement from "./Form.Enregistrement";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

export default function SEnregistrer() {
	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<div className="wrapper">
				<div className="main-header">
					<LogoContext />
					<div className="logo-header">
						<p className="logo">
							<img
								src={process.env.PUBLIC_URL + `/picture/logo/e-CIN.png`}
								alt="pdp"
								style={{ width: "auto", height: "55px", borderRadius: "0%" }}
							/>
						</p>
					</div>

					<nav className="navbar navbar-header navbar-expand-lg">
						<div className="container-fluid">
							<HeaderContext />
						</div>
					</nav>
				</div>

				<SideBarContext />

				<div className="main-panel">
					<div className="content">
						<div className="container-fluid">
							<div class="container-login100-SingUp">
								<div class="wrap-login100-SingUp">
									<FormulaireEnregistrement />
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
