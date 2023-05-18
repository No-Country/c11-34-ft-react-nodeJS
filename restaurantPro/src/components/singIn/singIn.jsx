import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import facebook from "../../icons/facebook-logo.png";
import InstagramLogo from "../../icons/instagram-logo.png";
import googleIcon from "../../icons/google-logo.png";
import "./styles.css";

export default function SignIn() {
  const navigation = useNavigate();

  const [emailExists, setEmailExists] = useState(false);

  const [user, setUser] = useState({
    emailUser: "",
    passwordUser: "",
  });

  function onChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    document.getElementById("correoInp").focus();
  }, []);

  const checkEmailExistence = async () => {
    const response = await fetch(
      `https://ncback-production.up.railway.app/api/usuarios?correo=${user.emailUser}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: user.emailUser }),
      }
    );
    const data = await response.json();
    setEmailExists(data.usuario);
    console.log(data.usuario)
  };

  const loginUser = async () => {
    await checkEmailExistence();

    if(emailExists){
      const data = {
        correo: user.emailUser,
        contrasena: user.passwordUser,
      };
      const resp = await fetch(
        "https://ncback-production.up.railway.app/api/usuarios/",
        data
      );
      console.log(resp);

      setUser({
        emailUser: "",
        passwordUser: "",
      });
      navigation("/")
    } else {
      alert("El correo no existe");
    
    }

    setUser({
      correo: "",
      contrasena: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

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
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="emailUser"
            id="correoInp"
            placeholder="Email"
            value={user.emailUser}
            onChange={onChange}
          />
          <input
            type="password"
            name="passwordUser"
            id="passwordInp"
            placeholder="Contraseña"
            value={user.passwordUser}
            onChange={onChange}
          />
          <div className="forgotPass">
            <Link to={``} className="restaurantLink">
              ¿Olvidaste la contraseña?
            </Link>
          </div>
          <button type="submit" className="confirmBtn">
            Confirmar
          </button>
        </form>
        <div className="options">
          <hr />
          <div className="textContain">
            <span>O ingresa con</span>
          </div>
          <hr />
        </div>
        <div className="containerLinks">
          <Link to="#">
            <img 
            className="iconSocial" 
            src={facebook} 
            alt="Facebook Icon" />
          </Link>
          <Link to="#">
            <img
              className="iconSocial"
              src={InstagramLogo}
              alt="Facebook Icon"
            />
          </Link>
          <Link to="#">
            <img 
            className="iconSocial" 
            src={googleIcon} 
            alt="Google Icon" />
          </Link>
        </div>
        <div className="createAcc">
          <h3 className="register">¿Aún no tienes cuenta?</h3>
          <Link to={``} className="registerLink">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
