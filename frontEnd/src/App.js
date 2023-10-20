import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Accueil from "./components/design/accueil";
import Utilisateur from "./components/utilisateur/utilisateur";
import Arrondissement from "./components/arrondissement/arrondissement";
import Origine from "./components/origine/origine";
import Profession from "./components/profession/profession";
import SeConnecter from "./components/login/SeConnecter";
import SEnregistrer from "./components/login/SEnregistrer";
import Authentification from "./contexts/Protected";
import Deconnection from "./contexts/Deconnection";
import Procedure_cin from "./components/procedure_cin/procedure_cin";
import Individu from "./components/individu/individu";
import AjoutIndividu from "./components/individu/AjoutIndividu";
import AjoutProcedure_cin from "./components/procedure_cin/AjoutProcedure";
import DetailsIndividu from "./components/individu/detailsIndividu";
import FicheMerePic from "./components/individu/picFicheMere";
import Statisique from "./components/statistiques/stats";

import PageNotFound from "./components/404/page404";

export default function App() {
	return (
		<>
			<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
			<BrowserRouter>
				<Routes>
					<Route index element={<Deconnection Cmp={SeConnecter} />} />

					<Route path="/*" element={<Authentification Cmp={PageNotFound} />} /> 

					<Route
						path="stats/"
						element={<Authentification Cmp={Statisique} />}
					/>

					<Route path="origine/" element={<Authentification Cmp={Origine} />} />

					<Route path="newUtilisateur/" element={<Deconnection Cmp={SEnregistrer} />} />

					<Route path="accueil/" element={<Authentification Cmp={Accueil} />} />

					<Route
						path="utilisateur/"
						element={<Authentification Cmp={Utilisateur} />}
					/>

					<Route
						path="arrondissement/"
						element={<Authentification Cmp={Arrondissement} />}
					/>

					<Route
						path="profession/"
						element={<Authentification Cmp={Profession} />}
					/>

					<Route
						path="procedure/"
						element={<Authentification Cmp={Procedure_cin} />}
					/>

					<Route
						path="individu/"
						element={<Authentification Cmp={Individu} />}
					/>

					<Route
						path="newIndividu/"
						element={<Authentification Cmp={AjoutIndividu} />}
					/>

					<Route
						path="newProcedure/"
						element={<Authentification Cmp={AjoutProcedure_cin} />}
					/>

					<Route
						path="detailsIndividu/:cin"
						element={<Authentification Cmp={DetailsIndividu} />}
					/>

					<Route
						path="photoFicheMere/:cin"
						element={<Authentification Cmp={FicheMerePic} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
