const socket = io();
const inputTitulo = document.querySelector("#title");
const inputPrecio = document.querySelector("#price");
const inputThumbnail = document.querySelector("#thumbnail");

const enviar = document.querySelector("#send");
const listado = document.querySelector("#list");

socket.on("productos", (productos) => {
  console.log(productos);
  listado.innerHTML = productos
    .map((p) => {
      return `
      <tr> 
        <td>${p.title}</td> 
        <td>${p.price}</td> 
        <td><img width="50" src=${p.thumbnail} alt="..."></td> 
      </tr>
  
`;
    })
    .join("<br>");
});

enviar.addEventListener("click", () => {
  socket.emit("productoNuevo", {
    title: inputTitulo.value,
    price: inputPrecio.value,
    thumbnail: inputThumbnail.value,
  });
});
