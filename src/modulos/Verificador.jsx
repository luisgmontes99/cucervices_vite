import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cliente.css";
import Cookies from "js-cookie";
import axios from "axios";
import { recargarPagina, salir, verificar } from "./Funciones";

export default function Verificador() {
  const navigate = useNavigate();
  const userData = JSON.parse(Cookies.get("userData"));
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      axios
        .get("http://localhost:8081/cliente/verificado", {
          params: {
            consulta: userData,
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data)
          sessionStorage.setItem("user", data[0].Usuario);
          sessionStorage.setItem("gmail", data[0].Correo);
          sessionStorage.setItem("nu", data[0].ID);
        })
        .catch((error) => {
          console.error("No se recibieron los datos: ", error);
        });
    } else {
      alert("No has iniciado sesion");
      window.location.assign("/");
    }
  }, [userData]);
  function irSer() {
    navigate("/home-ser");
  }
  function irCliente() {
    navigate("/cliente");
  }

  return (
    <div className="big-box">
      <div className="topnav">
        <ul className="barra_sup">
          <button onClick={irCliente}>Mi cuenta</button>
        </ul>
      </div>
      <div className="elementos">
        <div className="categoria">
          <ul>
            <li>
              <button className="lateral" onClick={recargarPagina}>
                Ventas
              </button>
            </li>
            <li>
              <button className="lateral" onClick={irSer}>
                Servicios
              </button>
            </li>
            <li>
              <button className="lateral">Contactos</button>
            </li>
          </ul>
          <button onClick={salir} className="btn_salir">
            SALIR DE SESION
          </button>
        </div>
        <div className="resultados">{verificar()}</div>
      </div>
    </div>
  );
}
