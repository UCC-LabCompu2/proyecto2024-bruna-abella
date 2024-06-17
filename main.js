var canvas = document.getElementById("canvas"), // Variable Global del canvas. Es necesaria para la funcion dibujar.
    ctx = canvas.getContext("2d");


window.onload = function() {
    const imagen = new Image();
    imagen.src = "images/grid.png";
    ctx.drawImage(imagen, 24, -68);
    ctx.translate(canvas.width / 2, canvas.height / 2); 
};

/**
 * FUncion Que Pone una alerta general al usuario.
 * @method AlertaERRORCampo
 */

let AlertaERRORCampo = () => { // Si no se ingresa una funcion valida se le alertara al usuario.
    alert("ERROR: La funcion ingresada no se puede graficar!");
}

/**
 * Esta funcion se fija si encuetran algun valor distinto A NaN ya que eso contaria como funcion.
 * @method checkValido
 * @param {*} expresion - Expresion de la funcion a Graficar.
 * @returns true o false
 */

let checkValido = (expresion) => {
    let distintos = 0;
    for (let i = -20; i < 20; i++) {

        if (isNaN(expresion(i))) {
            console.log("NAAAN");
            if (expresion(i) != expresion(i + 1)) {
                distintos++;
            }
        } else {
            return true;
        }
    }
    if (distintos == 0) {
        return false;
    }
    return true;
}



// Dibujar funciones

/**
 * @method dibujar
 * @param {*} funcion - Pasa la expresion de la funcion a graficar.
 * @param {string} color - Pasa el color de la funcion a graficar.
 * @param {int} ancho - Pasa el ancho de la funcion a graficar.
 */
let dibujar = (funcion, color, ancho) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho;

    const scale = 100;
    var pixelStep = 1 / scale;
    w = canvas.width; // El ancho del canvas
    h = canvas.height; // El largo del canvas
    step = w / 40 * scale;
    var pixel = w / 40; // La cantidad de pixeles en el canvas que equivalen a un valor de x.
    const yscale = h / 20; // La cantidad de pixeles en el canvas que equivalen a un valor de y.

    for (let x = -20; x < 20; x += pixelStep) {
        setTimeout(function () { // Usamos timeout para simular una animacion al momento de hacer los calculos y graficar.
            let y = (funcion(x) * yscale);
            let yy = funcion((x + pixelStep)) * yscale;

            if (Math.abs(yy * yscale) > 50000) { // Con esto buscamos evitar lo maximo posible graficar cosas fuera del canvas.
                return;
            }
            ctx.moveTo(x * pixel, y);
            ctx.lineTo((x + pixelStep) * pixel, yy);
            ctx.stroke();
            console.log(funcion(x).toFixed(1));
        }, 1000)
    }
}




let generarGrafico = (form) => {
    form.preventDefault();
    const funciontext = (document.getElementById("funcion").value);
    if (funciontext == "" || funciontext == " ") {
        AlertaERRORCampo();
    }
    try {
        if (checkValido((x) => (-Math.fround(eval(funciontext)))) == true) {
            let color = document.getElementById("colorgraf").value;
            dibujar((x) => (-Math.fround(eval(funciontext))), color, 1);
        }
    } catch (error) {
        AlertaERRORCampo();
        document.getElementById("funcion").value = "";
    }
}


let insert_b = (value) => {
    let fun = document.getElementById("funcion");
    fun.value = fun.value + value;
}

