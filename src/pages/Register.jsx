import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataReg } from "../modulos/DataReg";
import axios from "axios";
import { Icon } from "@iconify/react";
import "../styles/Register.css";

const Register = () => {
  const [data, setData] = useState({
    usuario: "",
    correo: "",
    contra: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Se valida que los datos no cuenten con algun error
    setError(DataReg(data));
    //Se valida que los datos esten llenos
    if (
      error.usuario === undefined &&
      error.correo === undefined &&
      error.contra === undefined
    ) {
      axios
        //Genera un nuevo usuario ya habiendo realizado las comprobaciones
        .post("http://localhost:8081/reg", data)
        .then((res) => {
          navigate("/"); //Regresa al Login
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div id="app">
      <div id="box2">
        <div id="formulario2">
          <form onSubmit={handleSubmit} id="form">
            <div id="params2">
              <Icon icon="ph:user" id="icon" />
              <input
                placeholder="Ingresa tu usuario"
                id="nombre"
                name="usuario"
                onChange={handleInput}
                required
              ></input>
            </div>
            <div id="params2">
              <Icon icon="basil:gmail-outline" id="icon" />
              <input
                placeholder="Ingresa tu correo"
                id="correo"
                name="correo"
                onChange={handleInput}
                required
              ></input>
            </div>
            <div id="params2">
              <Icon icon="mdi:password-outline" id="icon" />
              <input
                placeholder="Ingresa tu contraseña"
                type="password"
                id="contra"
                name="contra"
                onChange={handleInput}
                required
              ></input>
            </div>
            <div id="params2">
              <Icon icon="mdi:password-outline" id="icon" />
              <input
                placeholder="Ingresa tu contraseña de nuevo"
                id="contraV"
                type="password"
                onChange={handleInput}
                required
              ></input>
            </div>
            <button type="submit" id="btn3">
              Registrarse
            </button>
            <div id="parr_reg">
              <p>¿Ya tienes una cuenta?{"  "} </p>
              <Link to={"/"} className="btn2">
                Inicia sesion
              </Link>
            </div>
          </form>
        </div>
        <div id="frase2">
          <h1 id="palabras">REGISTRAR UNA CUENTA</h1>
          <p id="expl">
            Este es el momento en que como estudiante puedes obtener un acceso
            inicial en el que puedas entrar a nuestro sitio web para ver algunos
            de los productos y servicios que nos puede ofrecer nuestra comunidad
            universitaria y que ademas, tenga un facil acceso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
