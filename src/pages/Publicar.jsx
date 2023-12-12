import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Publicar.css";
import Cookies from "js-cookie";
import axios from "axios";
import { salir } from "../modulos/Funciones";

export default function Publicar() {
  const usuario = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const userData = JSON.parse(Cookies.get("userData"));
  const [data, setData] = useState({
    usuario: usuario,
    titulo: "",
    descripcion: "",
    opc: "",
    imagen: null,
  });
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleImagenChange = (event) => {
    const archivo = event.target.files[0];
    setImagenSeleccionada(archivo);
  };

  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data2 = new FormData();
    data2.append("user", data.usuario)
    data2.append("titu", data.titulo)
    data2.append("desc", data.descripcion)
    data2.append("opci", data.opc)
    data2.append("imagen", imagenSeleccionada)

    console.log(data);
    axios
      .post("http://localhost:8081/cliente/crear", data2)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
    /*for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }*/
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      axios
        .get("http://localhost:8081/cliente/crear", {
          params: {
            consulta: userData,
          },
        })
        .then((response) => {
          const data = response.data;
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
  //Funcion para ir a la pestaña de "Servicios"
  function irSer() {
    navigate("/home-ser");
  }
  //Funcion para ir a ver la informacion del usuario
  function irCliente() {
    navigate("/cliente");
  }
  //Funcion para ir a la pestaña de "Ventas"
  function irVentas() {
    navigate("/home-ventas");
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
              <button className="lateral" onClick={irVentas}>
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
        <div className="resultados_articulo">
          <div className="formulario_crear">
            <h2>{usuario} completa los siguientes campos</h2>
            <h2>Selecciona una opción:</h2>
            <select name="opc" onChange={handleInput} defaultValue="">
              <option value="" disabled>
                Selecciona
              </option>
              <option value="Venta">Venta</option>
              <option value="Servicio">Servicio</option>
            </select>
            <input
              onChange={handleInput}
              name="titulo"
              placeholder="inserta titulo caracterisico"
            />
            <input
              name="descripcion"
              onChange={handleInput}
              placeholder="inserta la descripcion de tu articulo"
            />
            <div>
              <input
                type="file"
                name="imagen"
                id="imagenInput"
                accept="image/*"
                onChange={handleImagenChange}
              ></input>
            </div>
            <button onClick={handleSubmit}>
              Crear publicacion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
