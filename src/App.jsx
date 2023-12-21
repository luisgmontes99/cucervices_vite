import { BrowserRouter, Route, Routes } from "react-router-dom";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import * as React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cliente from "./pages/Cliente";
import Services from "./pages/Services";
import Ventas from "./pages/Ventas";
import Item from "./modulos/Item";
import Item2 from "./modulos/Item2";
import Verificador from "./modulos/Verificador";
import Publicar from "./pages/Publicar";
import Venta from "./pages/Venta";
import Item3 from "./modulos/Item3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reg" element={<Register />} />
        <Route exact path="/home-ventas" element={<Cliente />} />
        <Route exact path="/home-ventas/producto/:id" element={<Item />} />
        <Route exact path="/home-ser/servicios/:id" element={<Item2 />} />
        <Route exact path="/home-ser" element={<Services />} />
        <Route exact path="/cliente" element={<Ventas />} />
        <Route exact path="/cliente/verificado" element={<Verificador />} />
        <Route exact path="/cliente/crear" element={<Publicar />} />
        <Route exact path="*" element={<Venta />} />
        <Route exact path="/hola" element={<Item3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
