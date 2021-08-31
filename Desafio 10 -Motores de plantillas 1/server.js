const express = require("express");
const Handlebars = require("express-handlebars");
const Productos = require("./productos");

const puerto = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
const routerGlobal = express.Router();

app.engine(
  ".hbs",
  Handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.set("view engine", "hbs");

app.set("views", "./views");

routerGlobal.get("/productos/vista", (req, res) => {
  let arrayProductos = Productos.leerProductos();
  if (arrayProductos.error) {
    res.render("main", { hayProductos: false });
  } else {
    res.render("main", { hayProductos: true, productos: arrayProductos });
  }
});

routerGlobal.get("/", (req, res) => {
  console.log("formulario");
  res.render("./partials/formulario");
});

routerGlobal.get("/productos/listar", (req, res) => {
  res.json(Productos.leerProductos());
});

routerGlobal.get("/productos/listar/:id", (req, res) => {
  res.json(Productos.leerProductosConId(req.params.id));
});

routerGlobal.post("/productos/guardar", (req, res) => {
  let prodGuardado = Productos.productoNuevo(req.body);
  res.send(prodGuardado);
});

routerGlobal.put("/productos/actualizar/:id", (req, res) => {
  let prodNuevo = req.body;
  let idProdNuevo = req.params.id;
  let prodActualizado = Productos.actualizarConID(idProdNuevo, prodNuevo);
  res.send(prodActualizado);
});

routerGlobal.delete("/productos/borrar/:id", (req, res) => {
  let idProdABorrar = req.params.id;
  let prodBorrado = Productos.borrarConID(idProdABorrar);
  es.send(prodBorrado);
});

app.use("/api", routerGlobal);

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", (error) => {
  console.log("Error en el servidor:", error);
});
