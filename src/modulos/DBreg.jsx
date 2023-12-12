const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // Tamaño máximo del archivo en bytes (25 MB)
    files: 1, // Cantidad máxima de archivos por solicitud
  },
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  database: "usuarios",
  user: "root",
  password: "",
  port: 3306, //IA-plu$_2022
});

const db2 = mysql.createConnection({
  host: "127.0.0.1",
  database: "resultados",
  user: "root",
  password: "",
  port: 3306, //IA-plu$_2022
});

app.post("/reg", (req, res) => {
  const sql = "INSERT INTO users (Usuario,Correo,Contrasenia) VALUES (?)";
  const datos = [req.body.usuario, req.body.correo, req.body.contra];
  db.query(sql, [datos], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/home-ventas", (req, res) => {
  //console.log(req.query.consulta)
  if (req.query.consulta !== "") {
    const consulta2 = `SELECT * FROM ventas WHERE descripcion LIKE '%${req.query.consulta}%' OR titulo LIKE '%${req.query.consulta}%'`;
    db2.query(consulta2, (err, filas) => {
      if (err) {
        return res.sendStatus(500).send(err);
      } else {
        return res.json(filas);
      }
    });
  } else {
    db2.query("SELECT * FROM ventas", (err, filas) => {
      if (err) {
        return res.sendStatus(500).send(err);
      } else {
        return res.json(filas);
      }
    });
  }
});

app.get("/home-ventas/producto", (req, res) => {
  //console.log(req.query.consulta)
  const consulta2 = `SELECT * FROM ventas WHERE id = '${req.query.consulta}'`;
  db2.query(consulta2, (err, filas) => {
    if (err) {
      return res.sendStatus(500).send(err);
    } else {
      return res.json(filas);
    }
  });
});

app.get("/home-ser/servicios", (req, res) => {
  //console.log(req.query.consulta)
  const consulta2 = `SELECT * FROM servicios WHERE id = '${req.query.consulta}'`;
  db2.query(consulta2, (err, filas) => {
    if (err) {
      return res.sendStatus(500).send(err);
    } else {
      return res.json(filas);
    }
  });
});

app.get("/home-ser", (req, res) => {
  if (req.query.consulta !== "") {
    const consulta2 = `SELECT * FROM servicios WHERE descripcion LIKE '%${req.query.consulta}%' OR titulo LIKE '%${req.query.consulta}%'`;
    db2.query(consulta2, (err, filas) => {
      if (err) {
        return res.sendStatus(500).send(err);
      } else {
        return res.json(filas);
      }
    });
  } else {
    db2.query("SELECT * FROM servicios", (err, filas) => {
      if (err) {
        return res.sendStatus(500).send(err);
      } else {
        return res.json(filas);
      }
    });
  }
});

app.get("/cliente", (req, res) => {
  //console.log(req.query.consulta)
  const consulta2 = `SELECT * FROM users WHERE Usuario LIKE '${req.query.consulta}' LIMIT 1`;
  db.query(consulta2, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/cliente/verificado", (req, res) => {
  //console.log(req.query.consulta)
  const consulta2 = `SELECT * FROM users WHERE Usuario LIKE '%${req.query.consulta}%' LIMIT 1`;
  db.query(consulta2, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/cliente/crear", (req, res) => {
  //console.log(req.query.consulta)
  const consulta2 = `SELECT * FROM users WHERE Usuario LIKE '${req.query.consulta}' LIMIT 1`;
  db.query(consulta2, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/cliente/crear", upload.single("imagen"), (req, res) => {
  const usuario = req.body.user;
  const titulo = req.body.titu;
  const descr = req.body.desc;
  const opc = req.body.opci;
  const img = req.file;
  //console.log(img.buffer)
  if (opc === "Venta") {
    const sql = "INSERT INTO ventas (img, usuario, titulo, descripcion) VALUES (?, ?, ?, ?)";
    const values = [img.buffer, usuario, titulo, descr];
    db2.query(sql, values, (err) => {
      if (err) {
        return res.json("Error");
      } else {
        return res.json("Exito");
      }
    });
  }else if(opc ==="Servicio"){
    const sql =
      "INSERT INTO servicios (img, descripcion, titulo, usuario) VALUES (?, ?, ?, ?)";
    const values = [img.buffer, descr, titulo, usuario];
    db2.query(sql, values, (err) => {
      if (err) {
        return res.json("Error");
      } else {
        return res.json("Exito");
      }
    });
  }
  return
});

app.post("/cliente", upload.single("image"), (req, res) => {
  const correo = req.body.correoN;
  const nusuar = req.body.nusuar;
  const usuario = req.body.usuarioN;
  const image = req.file;
  if (image) {
    const sql = "UPDATE users SET imgp = ? WHERE id = ?";
    const values = [image.buffer, nusuar];
    db.query(sql, values, (error, results) => {
      if (error) {
        //console.error('Error al actualizar el BLOB:', error);
      } else {
        //console.log('BLOB actualizado exitosamente');
      }
    });
  }
  if (usuario === "" && correo !== "") {
    const consulta2 = "UPDATE users SET Correo = ? WHERE id = ?";
    db.query(consulta2, [correo, nusuar], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  } else if (correo === "" && usuario !== "") {
    const consulta2 = "UPDATE users SET Usuario = ? WHERE id = ?";
    db.query(consulta2, [usuario, nusuar], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  } else if (correo !== "" && usuario !== "") {
    const consulta2 = "UPDATE users SET Usuario = ?, Correo = ? WHERE id = ?";
    db.query(consulta2, [usuario, correo, nusuar], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    });
  }
  return res.json("Cambio de imagen");
});

app.post("/login", (req, res) => {
  console.log("ingreso");
  const sql = "SELECT * FROM users WHERE Usuario=? AND Contrasenia=?";
  db.query(sql, [req.body.usuario, req.body.contra], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      //console.log(data[0].verificado)
      return res.json(data[0].verificado);
    } else {
      return res.json("Error");
    }
  });
});

app.listen(8081, () => {
  console.log("Servidor Levantado");
});