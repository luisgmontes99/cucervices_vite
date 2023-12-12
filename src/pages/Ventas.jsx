import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cliente.css";
import Cookies from "js-cookie";
import axios from "axios";
import { recargarPagina, salir, URL_img } from "../modulos/Funciones";

function Ventas() {
  const navigate = useNavigate();
  const userData = JSON.parse(Cookies.get("userData"));
  const [correoC, setC] = useState("");
  const [usuarioC, setU] = useState("");
  const [img, setI] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleImagenChange = (event) => {
    const archivo = event.target.files[0];
    setImagenSeleccionada(archivo);
  };

  const handleChange = (event) => {
    const valorInput = event.target.value;
    setU(valorInput);
  };

  const handleChange2 = (event) => {
    const valorInput = event.target.value;
    setC(valorInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*Se genera un Formata para actualizar algun dato*/
    const data2 = new FormData();
    data2.append("correoN", correoC);
    data2.append("usuarioN", usuarioC);
    data2.append("nusuar", sessionStorage.getItem("nu"));
    data2.append("image", imagenSeleccionada);
    axios
      .post("http://localhost:8081/cliente", data2)
      .then((res) => {
        if (usuarioC !== "") {
          Cookies.set("userData", JSON.stringify(usuarioC));
        }
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      axios
      //Se obtiene la informacion del usuario
        .get("http://localhost:8081/cliente", {
          params: {
            consulta: userData,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data[0]) {
            sessionStorage.setItem("user", data[0].Usuario);
            sessionStorage.setItem("gmail", data[0].Correo);
            sessionStorage.setItem("nu", data[0].ID);
            setI(data[0].imgp);
          }
        })
        .catch((error) => {
          console.error("No se recibieron los datos: ", error);
        });
    } else {
      alert("No has iniciado sesion"); //Al no iniciar sesion, se le regresa al Login
      window.location.assign("/");
    }
  }, []);
  //Funcion para ir a la pestaña de Servicios
  function irSer() {
    navigate("/home-ser");
  }
  //Funcion para ir a la pestaña de Ventas
  function irVentas() {
    navigate("/home-ventas");
  }
  /*Se obtiene el usuario y el correo para poder mostrarlos como 
  espacio a rellenar en el formulario*/
  const usuario = sessionStorage.getItem("user");
  const correo = sessionStorage.getItem("gmail");
  return (
    <div className="big-box">
      <div className="topnav">
        <ul className="barra_sup">
          <button onClick={recargarPagina}>Mi cuenta</button>
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
        <div className="resultados">
          <div className="box">
            {URL_img(img)}
            <h1>Datos de la cuenta</h1>
            <div className="cambios">
              <label>Cambiar Nombre de usuario</label>
              <input
                placeholder={usuario}
                name="usuario"
                value={usuarioC}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="cambios">
              <label>Cambiar Correo Electronico</label>
              <input
                placeholder={correo}
                name="correo"
                value={correoC}
                onChange={handleChange2}
                type="gmail"
                required
              ></input>
            </div>
            <div className="cambios">
              <label>Cambiar Imagen de usuario</label>
              <input type="file" id="imagenInput" accept="image/*" onChange={handleImagenChange}></input>
            </div>
            <button className="btn_cambio" onClick={handleSubmit}>
              Cambiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ventas;
