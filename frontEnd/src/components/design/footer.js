import { Link } from "react-router-dom";

export default function FooterContext() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/accueil/" className="nav-link text-primary" >
                  A.V-H
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" >
                  Aide
                </span>
              </li>
            </ul>
          </nav>
          
          <div className="copyright ml-auto">
            Réaliser par :
            <a href="https://www.facebook.com/nykanto.michella" target="_blank">
              <span> Ny Kanto </span>
            </a>
            <span> en 2023 </span>
          </div>
        </div>
      </footer>
    </>
  );
}
