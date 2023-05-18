import { Link } from "react-router-dom";
import "./styles.css";

export default function SignIn() {
  return (
    <div className="mainContainer">
      <div className="containerForm">
        <div className="containerImg">
          <img
            className="imgPrimary"
            src="https://www.ehosa.es/wp-content/uploads/2016/12/mesa-reservada.jpg"
            alt=""
          />
        </div>
        <form action="/" method="post">
          <input
            type="email"
            name="emailUser"
            id="correoInp"
            placeholder="Email"
          />
          <input
            type="password"
            name="passwordUser"
            id="passwordInp"
            placeholder="Contraseña"
          />
          <div className="forgotPass">
            <Link to={``} className="restaurantLink">
              ¿Olvidaste la contraseña?
            </Link>
          </div>
          <button className="confirmBtn">Confirmar</button>
        </form>
        <div className="options">
          <hr/>
          <div className="textContain">
            <span>O ingresa con</span>
          </div>
          <hr />
        </div>
        <div className="containerLiniks">
          <Link>
            <img
              className="iconSocial"
              src="https://img.icons8.com/?size=512&id=435&format=png"
              alt="fbIcon"
            />
          </Link>
          <Link>
            <img
              className="iconSocial"
              src="https://img.icons8.com/?size=512&id=DpOQ6G5p47f0&format=png"
              alt="igIcon"
            />
          </Link>
          <Link>
            <img
              className="iconSocial"
              src="https://img.icons8.com/?size=512&id=17904&format=png"
              alt="googleIcon"
            />
          </Link>
        </div>
        <div className="createAcc">
          <h3 className="register">¿Aun no tienes cuenta?</h3>
          <Link to={``} className="registerLink">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
