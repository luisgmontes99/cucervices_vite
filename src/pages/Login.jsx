import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import React, { useState } from "react";
import axios from "axios";
import { DataLog } from "../modulos/DataLog";
import Cookies from "js-cookie";
import { Icon } from '@iconify/react';

export const Login = () => {
  sessionStorage.clear();
  const [data, setData] = useState({
    usuario: "",
    contra: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(DataLog(data));
    if (error.usuario === "" && error.contra === "") {
      axios
        .post("http://localhost:8081/login", data)
        .then((res) => {
          /*En caso de que los datos no regresen un error, nos dara acceso a la siguiente pestaña 
          que es la de "Ventas" y su direccion es /home-ventas*/
          if (res.data !== "Error") {
            //El primer cookie se encargar de almacenar la informacion importante y unica del usuario, será mejor usar el ID que es unico
            Cookies.set("userData", JSON.stringify(data.usuario));
            Cookies.set("verificado", JSON.stringify(res.data));
            const authToken = "valido";
            const cookieExpirationDays = 1;
            const cookieValue = `${encodeURIComponent(
              "authToken"
              /*Esto basicamente es para poder generar un tiempo limite en el
              que el usuario puede recargar la pagina sin iniciar sesion (Puede descartarse)  */
            )}=${encodeURIComponent(authToken)}; max-age=${
              cookieExpirationDays * 24 * 60 * 60
            }`;
            document.cookie = cookieValue;
            navigate("/home-ventas");
          } else {
            alert("Los datos son incorrectos");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
      <form onSubmit={handleSubmit} id="app">
        <div id="box">
          <div id="frase">
            <h1 id="palabras">BIENVENIDO A CUCERVICES</h1>
            <p id="expl">
              Esta es una aplicacion dedicada a la venta de productos y tambien
              un espacio generado para que nuestros estudiantes puedan ofrecer
              servicios que les puedan ayudar para generar un crecimiento en el
              ambito laboral incrementando su experiencia en servicios que
              puedan brindar{" "}
            </p>
          </div>
          <div id="formulario">
            <div id="params">
              <Icon icon="ph:user" id="icon"/>
              <input
                className="input"
                placeholder="Ingresa tu usuario"
                id="txt_usuario"
                name="usuario"
                onChange={handleInput}
                required
              ></input>
              <span>{error.usuario && <span>{error.usuario}</span>}</span>
            </div>
            <div id="params">
              <Icon icon="mdi:password-outline" id="icon"/>
              <input
                placeholder="Ingresa tu contraseña"
                id="txt_contra"
                name="contra"
                type="password"
                onChange={handleInput}
              ></input>
              <span>{error.contra && <span>{error.contra}</span>}</span>
            </div>
            <button type="submit" id="btn1">
              Iniciar Sesion
            </button>
            <div id="parr_reg">
              <p>¿Eres nuevo por aquí?{"  "} </p>
              <Link to={"/reg"} className="btn2">
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </form>
  );
};

export default Login;
