// Funcion

function Usuario (nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;

    this.getFullName = () => `${this.nombre} ${this.apellido}`;
    this.addMascotas = (nombre) => this.mascotas.push(nombre);
    this.getMascotas = () => this.mascotas.length;
    this.addBooks = (nombre,autor) => this.libros.push(
        {
            nombre,
            autor
        }
    )
    this.getBooks = () => this.libros.map (e => e.nombre)
}


// Clase
class UsuarioC {
    constructor(nombre,apellido,librosC,mascotasC){
        this.nombre = nombre;
        this.apellido = apellido;
        this.librosC = librosC;
        this.mascotasC = mascotasC;
    }
    getFullNameC = () => `${this.nombre} ${this.apellido}`;
    addMascotasC = (nombre) => this.mascotasC.push(nombre);
    getMascotasC = () => this.mascotasC.length;
    addBooksC = (nombre,autor) => this.librosC.push(
        {
            nombre,
            autor
        }
    )
    getBooksC = () => this.librosC.map (e => e.nombre)
}

let libros = [
    {
        nombre:'libro1',
        autor:'autor1',
    },
    {
        nombre:'libro2',
        autor:'autor2',
    },
];

let mascotas =['Gato','Perro','Loro','Conejo'];

let usuario1 = new Usuario('Juana','Funcion',libros,mascotas)

usuario1.addMascotas('pajarin')
usuario1.addBooks('señor de los anillos','el escritor')
console.log( usuario1.getFullName() )
console.log( usuario1.getMascotas() )
console.log( usuario1.getBooks())


console.log('<<<<--->>>>')


let librosC = [
    {
        nombre:'libroC1',
        autor:'autorC1',
    },
    {
        nombre:'libroC2',
        autor:'autorC2',
    },
];

let mascotasC =['firulaiC','michifuC'];

let usuario1C = new UsuarioC('Juana','Clase',librosC,mascotasC)
console.log( usuario1C.getFullNameC() )
console.log( usuario1C.getMascotasC() )
console.log( usuario1C.getBooksC());