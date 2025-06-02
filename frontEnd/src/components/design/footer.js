import { Link } from "react-router-dom";

export default function FooterContext() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/accueil/" className="nav-link text-primary">
                  A.V-H
                </Link>
              </li>
              <li
                className="nav-item" 
              >
                <a
                  href="https://trofel.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                >
                  Aide
                </a>
              </li>
            </ul>
          </nav>

          <div className="copyright ml-auto">
            Réaliser par :
            <a href="https://www.facebook.com/tendo.lelouch" target="_blank">
              <span> Trofel </span>
            </a>
            <span> en 2023 </span>
          </div>
        </div>
      </footer>
    </>
  );
}
