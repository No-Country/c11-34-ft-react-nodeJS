import { Link} from "react-router-dom";
import "../main/style.css";

export default function Main() {
  return (
    <header className="headerContainer">
      <div className="logo">
        <img
          id="logoNoCountry"
          src="https://uploads-ssl.webflow.com/62cc216ce23f79c10bc88169/63973e99052373b810cce94b_Branding%20NC-06.png"
          alt="logoNoCountry"
        />

        <nav>
          <ul>
            <li>
              <Link to={`./signup`}>Registrarse</Link>
            </li>
            <li>
              <Link to={`./signin`}>Iniciar sesion</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
