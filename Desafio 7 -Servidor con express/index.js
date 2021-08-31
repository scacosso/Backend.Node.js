//imports
const express = require("express")
const fs = require("fs")

const app = express()
const port = 8080

//lectura texto
let data = fs.readFileSync('./productos.txt', 'utf-8')
let productos = JSON.parse(data)
let productosTotal = JSON.parse(data)

let listadoNombres = []
let arrayProductos = () => {
    productosTotal.forEach(e => {
        listadoNombres.push(e.title) 
    });
    productosTotal = []
    return listadoNombres
}

let numeroRandom = () => {
    let numero = Math.floor(Math.random() * (productos.length))
    return numero
};

let contador1 = 0
let contador2 = 0


//ruta items
app.get('/items',(req, res) => {  
    contador1++
    let respuesta =`
        <html>
            <body>
                <p>
                {items: ${arrayProductos()}, cantidad: ${productos.length}}
                </p>
            </body>
        </html>
        `
    res.send(respuesta)
})

//ruta item random
app.get('/item-random',(req, res) => {
    contador2++
    let respuesta =`
        <html>
            <body>
                <p>
                {item: ${JSON.stringify(productos[numeroRandom()])}}
                </p>
            </body>
        </html>
        `
        res.send(respuesta)
    })  

// ruta visitas
app.get('/visitas',(req, res) => {
    let respuesta =`
<html>
    <body>
        {
            visitas:
            {item1: ${contador1}}
            {item2: ${contador2}}
        }
        </p>
    </body>
</html>
`
        res.send(respuesta)
    })

// servidor
app.listen(port, () => console.log(`server at http://localhost:${port}`))