const express = require("express");
const Productos = require("./productos");

const puerto = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));
const routerGlobal = express.Router();

//GET listado
routerGlobal.get("/productos/listar", (req, res) => {
  res.json(Productos.leerProductos());
});
//GET producto por ID
routerGlobal.get("/productos/listar/:id", (req, res) => {
  res.json(Productos.leerProductosConId(req.params.id));
});
//POST de un producto nuevo sin ID
routerGlobal.post("/productos/guardar", (req, res) => {
  let prodGuardado = Productos.productoNuevo(req.body);
  res.send(prodGuardado);
});
//PUT de un producto nuevo con ID
routerGlobal.put("/productos/actualizar/:id", (req, res) => {
  let prodNuevo = req.body;
  let idProdNuevo = req.params.id;
  let prodActualizado = Productos.actualizarConID(idProdNuevo, prodNuevo);
  res.send(prodActualizado);
});
//DELETE de un producto con ID
routerGlobal.delete("/productos/borrar/:id", (req, res) => {
  let idProdABorrar = req.params.id;
  let prodBorrado = Productos.borrarConID(idProdABorrar);
  res.send(prodBorrado);
});

// Router global
app.use("/api", routerGlobal);

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", (error) => {
  console.log("Error en el servidor:", error);
});
