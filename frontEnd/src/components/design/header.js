import getDataUtilisateur from "../../api/udata";
import { Link, useNavigate } from "react-router-dom";

import {
  BsFillBellFill,
  BsGear,
  BsBell,
  BsPower,
  BsFillFilter,
  BsFillFilterSquare,
  BsCaretRightFill,
  BsChatLeftText,
} from "react-icons/bs";

export default function HeaderContext() {
  const u_info = getDataUtilisateur();
  const navigate = useNavigate();
  const seDeconnecterDuSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {u_info.u_token ? (
        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
          <li className="nav-item dropdown hidden-caret">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i>
                <BsBell />
              </i>
              <span className="notification">3</span>
            </a>

            <ul
              className="dropdown-menu notif-box"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <div className="dropdown-title">Vous avez 3 notifications</div>
              </li>
              <li>
                <div className="notif-center">
                  <Link to="/approbation/">
                    <div className="notif-icon notif-primary">
                      <i className="mt-2">
                        <BsChatLeftText />
                      </i>
                    </div>
                    <div className="notif-content">
                      <span className="block">
                        3 Validation Procedure e-CIN
                      </span>
                      <span className="time">il y a 5 minutes </span>
                    </div>
                  </Link>
                </div>
              </li>
              <li>
                <Link to="/approbation/" className="see-all">
                  <strong>Voir toutes les notifications</strong>
                  <i className="mt-1">
                    <BsCaretRightFill />
                  </i>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a
              className="dropdown-toggle profile-pic"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <img
                src={
                  process.env.REACT_APP_SUN_COMPLET_URL + `${u_info.u_photoPDP}`
                }
                alt="pdp"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <span> {u_info.u_identification} </span>
            </a>

            <ul className="dropdown-menu dropdown-user">
              <li>
                <div className="user-box">
                  <a
                    className="u-img"
                    href="https://trofel.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        process.env.REACT_APP_SUN_COMPLET_URL +
                        `${u_info.u_photoPDP}`
                      }
                      alt="pdp"
                    />
                  </a>

                  <div className="u-text">
                    <h4> {u_info.u_identification} </h4>
                    <p className="text-muted">:-{u_info.u_attribut}-:</p>
                    <Link
                      to="/mesActions/"
                      className="btn btn-rounded btn-danger btn-sm"
                    >
                      Mes Actions
                    </Link>
                  </div>
                </div>
              </li>

              <div className="dropdown-divider"></div>

              <Link to="/parametreCompte/" className="dropdown-item">
                <i className="ti-settings">
                  <BsGear />
                </i>{" "}
                Paramètre de compte
              </Link>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => seDeconnecterDuSession(e)}
              >
                <i>
                  <BsPower />
                </i>{" "}
                Se déconnecter
              </a>
            </ul>
          </li>
        </ul>
      ) : null}
    </>
  );
}
