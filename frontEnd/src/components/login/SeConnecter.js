import FormulaireSeConnecter from "./Form.SeConnecter";
import Context from "../../contexts/Context";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { BsArrowRight } from "react-icons/bs";

export default function SeConnecter() {
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
								style={{ width: "80%", height: "100%", borderRadius: "0%" }}
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
							<div className="container-login100">
								<div className="wrap-login100">
									<div className="login100-pic js-tilt" data-tilt>
										<img
											src={process.env.PUBLIC_URL + `/picture/logo/fanjakana.jpg`}
											alt="image"
										/>
									</div>

									<FormulaireSeConnecter />
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
