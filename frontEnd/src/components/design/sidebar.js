import { Link } from "react-router-dom";
import getDataUtilisateur from "../../api/udata";
import { AjoutLibrary, libraryList } from "../../api/fils";

import {
  BsHouseFill,
  BsPeopleFill,
  BsGeoAltFill,
  BsFillBagDashFill,
  BsFillFilePersonFill,
  BsFiles,
  BsGlobe,
  BsBarChartLineFill,
  BsDoorOpen,
  BsFillFlagFill,
} from "react-icons/bs";

export default function SideBarContext() {
  const u_info = getDataUtilisateur();
  return (
    <>
      {u_info.u_token ? (
        <div className="sidebar">
          <div className="scrollbar-inner sidebar-wrapper">
            <ul className="nav mb-5">
              <li className="nav-item active mt-5">
                <Link to="/accueil/">
                  <i>
                    <BsHouseFill />
                  </i>
                  <p> Accueil</p>
                  <span className="badge badge-count">1</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/individu/">
                  <i>
                    <BsFillFilePersonFill />
                  </i>
                  <p> Individu</p>
                  <span className="badge badge-count">41</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/procedure/">
                  <i>
                    <BsFiles />
                  </i>
                  <p>Procedure e-CIN</p>
                  <span className="badge badge-count">57</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/arrondissement/">
                  <i>
                    <BsDoorOpen />
                  </i>
                  <p>Arrondissement</p>
                  <span className="badge badge-count">2</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profession/">
                  <i>
                    <BsFillBagDashFill />
                  </i>
                  <p>Profession</p>
                  <span className="badge badge-count">3</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/origine/">
                  <i>
                    <BsGlobe />
                  </i>
                  <p>Origine</p>
                  <span className="badge badge-count">3</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/utilisateur/">
                  <i>
                    <BsPeopleFill />
                  </i>
                  <p>Utilisateur</p>
                  <span className="badge badge-info">6</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stats/">
                  <i>
                    <BsBarChartLineFill />
                  </i>
                  <p>Statistique</p>
                  <span className="badge badge-success">25</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
