let operacion = async (a:number, b:number, op:string) => {
    switch (op) {
        case 'suma':
            let {Suma} = await import('./suma');
            let sumar = new Suma(a,b);
            return sumar.ver();
        case 'resta':
            let {Resta} = await import('./resta');
            let restar = new Resta(a,b);
            return restar.ver();
        default:
            break;    
    }
}

let operaciones = () => {
    operacion(10,3,"suma").then(res => console.log(res));
    operacion(20,3,"resta").then(res => console.log(res));
}

operaciones();