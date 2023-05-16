import { Link } from "react-router-dom";
import React from "react";
import "./styles.css";

export default function signIn() {
  return (
    <div className="mainContainer">
      <div className="containerForm">
        <h3 className="title">LOGIN</h3>
        <form action="/" method="post">
          <label htmlFor="correo">Correo</label>
          <input type="email" name="emailUser" id="correoInp" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="passwordUser" id="passwordInp" />
        </form>
        <div className="containerLiniks">
          <Link>
            <img
              src="https://cdn-icons-png.flaticon.com/256/2875/2875404.png"
              alt="googleIcon"
              width={`30px`}
            />
          </Link>
          <Link to={``} className="forgotLink" >Olvide la contraseña</Link>
        </div>
        <div className="registerBtn">
          <Link to={``} className="restaurantLink">Soy Restaurante</Link>
          <Link to={``} className="registerLink">Aun no tengo cuenta</Link>
        </div>
      </div>
    </div>
  );
}
