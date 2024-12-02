import FormulaireSeConnecter from "./Form.SeConnecter";
import Context from "../../contexts/Context";
import { AjoutLibrary, libraryList } from "../../api/fils";

import HeaderContext from "../design/header";
import LogoContext from "../design/logo";
import SideBarContext from "../design/sidebar";
import FooterContext from "../design/footer";
import axios from "../../api/axios";
import { useEffect } from "react";

export default function SeConnecter() {
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("profession/glitch/")
        .then(function (response) {
          //   console.log("Données récupérées : ", response.data);
        })
        .catch((error) => {
          //   console.error("Erreur lors de la récupération : ", error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // 1.MIN
    return () => clearInterval(interval);
  }, []);
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
                      src={
                        process.env.PUBLIC_URL + `/picture/logo/fanjakana.jpg`
                      }
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
