import { Link } from "react-router-dom";
import "../styles/Item3.css";

export const Item3 = () => {
  return (
    <div id="contenedor">
      <div id="encabezado">
        <h3>ENCABEZADO</h3>
      </div>
      <div id="barra_lateral">
        <ul>
          <li id="elemento">Ventas</li>
          <li id="elemento">Servicios</li>
          <li id="elemento">Contactos</li>
        </ul>
      </div>
      <div id="contenido2">
        <div id="imagen">
          <img
            id="img"
            src="https://i.pinimg.com/550x/a5/43/5e/a5435eef75627c203432417002b56b34.jpg"
            alt=""
          />
        </div>
        <div id="titulo">
          <h2>Titulo del producto</h2>
        </div>
        <div id="descripcion">
          <p id="desc_pr">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id dolorum
            facilis accusamus! Sed blanditiis neque omnis molestiae provident
            incidunt ullam rerum sint labore expedita. Quae pariatur fugit
            explicabo quos asperiores.
          </p>
        </div>
        <Link to={"/"} id="btn_reg">
            <p id="btn_txt1">REGERSAR</p>
        </Link>
      </div>
    </div>
  );
};

export default Item3;
