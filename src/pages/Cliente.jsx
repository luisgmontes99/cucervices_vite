import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cliente.css";
import Cookies from "js-cookie";
import axios from "axios";
import { recargarPagina, salir, mapeo_v, verificador } from "../modulos/Funciones";

function Cliente() {
  const verificado = Cookies.get("verificado");
  //console.log(verificado)
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState('');

  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      /*Se obitene la informacion de la pagina de ventas, esto genera las publicaciones ya realizadas 
      por todos los usuarios*/
      axios
        .get("http://localhost:8081/home-ventas", {
          params: {
            consulta: data,
          },
        })
        .then((response) => {
          const data = response.data;
          setResult(data);
        })
        .catch((error) => {
          console.error("No se recibieron los datos: ", error);
        });
    } else {
      alert("No has iniciado sesion");
      window.location.assign("/");
    }
  }, [data]);
  //Funcion para ir a la pestaña de "Servicios"
  function irSer() {
    navigate("/home-ser");
  }
  //Funcion para ir a la informacion del usuario
  function irCliente() {
    navigate("/cliente");
  }

  return (
    <div className="big-box">
      <div className="topnav">
        <ul className="barra_sup">
          <button onClick={irCliente}>Mi cuenta</button>
          {verificador(verificado)}
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
        <div className="resultados">
          <input onChange={handleInput} type="text" id="searchInput" placeholder="Buscar..." />
          {mapeo_v(result)
          }</div>
      </div>
    </div>
  );
}

export default Cliente;
