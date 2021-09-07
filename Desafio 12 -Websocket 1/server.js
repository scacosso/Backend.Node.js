const express = require("express");
const app = express();
const Handlebars = require("express-handlebars");
const Productos = require("./productos");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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

const productos = [];

io.on("connection", (socket) => {
  console.log("usuario conectado");

  socket.emit("productos", productos);

  socket.on("productoNuevo", (data) => {
    productos.push({
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
    });
    io.sockets.emit("productos", productos);
  });
});

routerGlobal.get("/productos/vista", (req, res) => {
  let arrayProductos = Productos.leerProductos();
  if (arrayProductos.error) {
    res.render("main", { hayProductos: false });
  } else {
    res.render("main", { hayProductos: true, productos: arrayProductos });
  }
});
routerGlobal.get("/", (req, res) => {
  res.render("./partials/formulario");
});
routerGlobal.get("/productos", (req, res) => {
  res.json(Productos.leerProductos());
});
routerGlobal.get("/productos/:id", (req, res) => {
  res.json(Productos.leerProductosConId(req.params.id));
});
routerGlobal.post("/productos", (req, res) => {
  let prodGuardado = Productos.productoNuevo(req.body);
  res.send(prodGuardado);
});
routerGlobal.put("/productos/:id", (req, res) => {
  let prodNuevo = req.body;
  let idProdNuevo = req.params.id;
  let prodActualizado = Productos.actualizarConID(idProdNuevo, prodNuevo);
  res.send(prodActualizado);
});
routerGlobal.delete("/productos/:id", (req, res) => {
  let idProdABorrar = req.params.id;
  let prodBorrado = Productos.borrarConID(idProdABorrar);
  res.send(prodBorrado);
});

app.use("/", routerGlobal);

server.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", (error) => {
  console.log("Error en el servidor:", error);
});
