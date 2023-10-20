import axios from "../../api/axios";
import React from "react";
import { useEffect, useState } from "react";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";

import { BsSearch } from "react-icons/bs";

import Chart from "../../contexts/Chart";
const URL_DE_BASE = `procedure_cin/stats/`;

export default function Statisique() {
	const [data, setData] = useState([]);

	//#region // DONNEE
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const result = await axios.get(URL_DE_BASE).then(function (response) {
			setData(response.data);
			console.log(response.data);
		});
	};

	const statRefresh = async () => {
		getUsers();
	};

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
					<br />
					<br />
					<br />
					<Chart
						labels={data.length == 0 ? ["pink"] : data[0].labels}
						data1={
							data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values
						}
						data2={
							data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[1].values
						}
						data3={
							data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[2].values
						}
					/>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
