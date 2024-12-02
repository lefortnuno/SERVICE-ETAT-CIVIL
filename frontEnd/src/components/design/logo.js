import getDataUtilisateur from "../../api/udata";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFilterLeft, BsThreeDotsVertical } from "react-icons/bs";

export default function LogoContext() {
  const u_info = getDataUtilisateur();

  return (
    <>
      {u_info.u_token ? (
        <div className="logo-header">
          <p className="logo">
            <img
              src={process.env.PUBLIC_URL + `/picture/logo/e-CIN.png`}
              alt="pdp"
              style={{ width: "auto", height: "55px", borderRadius: "0%" }}
            />
          </p>

          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <BsFilterLeft />
            </span>
          </button>
          <button className="topbar-toggler more">
            <i>
              <BsThreeDotsVertical />
            </i>
          </button>
        </div>
      ) : null}
    </>
  );
}
