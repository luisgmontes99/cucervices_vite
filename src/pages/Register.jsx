import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataReg } from "../modulos/DataReg";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [data, setData] = useState({
    usuario: "",
    correo: "",
    contra: ""
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
    if (error.usuario === undefined && error.correo === undefined && error.contra === undefined
    ) {
      axios
      //Genera un nuevo usuario ya habiendo realizado las comprobaciones
        .post("http://localhost:8081/reg", data)
        .then((res) => {
          navigate('/') //Regresa al Login
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="App">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>Ingresa los datos</h1>
          <div className="params">
            <label>Nombre de usuario</label>
            <input
              placeholder="Ingresa tu usuario"
              id="nombre"
              name="usuario"
              onChange={handleInput}
              required
            ></input>
          </div>
          <div className="params">
            <label>Correo Electronico</label>
            <input
              placeholder="Ingresa tu correo"
              id="correo"
              name="correo"
              onChange={handleInput}
              required
            ></input>
          </div>
          <div className="params">
            <label>Contraseña</label>
            <input
              placeholder="Ingresa tu contraseña"
              type="password"
              id="contra"
              name="contra"
              onChange={handleInput}
              required
            ></input>
          </div>
          <div className="params">
            <label>Confirma Contraseña</label>
            <input
              placeholder="Ingresa tu contraseña de nuevo"
              id="contraV"
              type="password"
              onChange={handleInput}
              required
            ></input>
          </div>
          <button type="submit" className="btn1">
            Registrarse
          </button>
          <Link to={"/"} className="btn2">
            Loguearte
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
