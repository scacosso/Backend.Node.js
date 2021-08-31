const express = require("express");
const Productos = require("./products");

const puerto = 8080;
const app = express();

app.use(express.json());

//GET listado completo de productos
app.get("/api/productos", (req, res) => {
  res.json(Productos.leerProductos());
});

//GET producto por ID enviado x params
app.get("/api/productos/:id", (req, res) => {
  //Llamo al metodo leer x ID del modulo productos pasando el id como parametro
  res.json(Productos.leerProductosConId(req.params.id));
});

//POST de un producto nuevo sin ID
app.post("/api/productos", (req, res) => {
  //almaceno el producto retornado de la request en una variable
  let prodGuardado = Productos.productoNuevo(req.body);
  //respondo con el producto nuevo creado y el id asignado
  res.send(prodGuardado);
});

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", (error) => {
  console.log("error en el servidor:", error);
});
