const canvas = document.getElementById("canvas"), // Variable Global del canvas. Es necesaria para la funcion dibujar.
    ctx = canvas.getContext("2d");


window.onload = function () {
    const imagen = new Image();
    imagen.src = "images/grid.png";
    ctx.drawImage(imagen, 24, -68);
    ctx.translate(canvas.width / 2, canvas.height / 2);
};

/**
 * Función Que Pone una alerta general al usuario.
 * @method AlertaERRORCampo
 */

let AlertaERRORCampo = () => { // Si no se ingresa una función valida se le alertará al usuario.
    alert("ERROR: La funcion ingresada no se puede graficar!");
}

/**
 * Esta función se fija si encuetran algún valor distinto A NaN ya que eso contaria como funcion.
 * @method checkValido
 * @param {*} expresion - Expresion de la función a Graficar.
 * @returns true o false
 */

let checkValido = (expresion) => {
    let distintos = 0;
    for (let i = -20; i < 20; i++) {

        if (isNaN(expresion(i))) {
            if (isNaN(expresion(i + 1)) === false) {
                distintos++;
            }
        } else {
            return true;
        }
    }
    if (distintos === 0) {
        return false;
    }
    return true;
}

// Dibujar funciones

/**
 * @method dibujar
 * @param {*} funcion - Pasa la expresion de la función a graficar.
 * @param {string} color - Pasa el color de la función a graficar.
 * @param {int} ancho - Pasa el ancho de la función a graficar.
 */
let dibujar = (funcion, color, ancho) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho;

    const scale = 100;
    const pixelStep = 1 / scale;
    const w = canvas.width; // El ancho del canvas
    const h = canvas.height; // El largo del canvas
    const pixel = w / 40; // La cantidad de pixeles en el canvas que equivalen a un valor de x.
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


/**
 * @method agregarHistorial - Agregara la funcion al historial si esta se puede dibujar.
 * @param {string} text - Funcion.
 * @param {string} color - Color de la funcion.
 */
let agregarHistorial = (text, color) => {
    document.getElementById("tabla_historial").style.display = "block"
    let thtml = '<tr>';
    thtml += '<td>' + text + '</td><td>' + color + '</td></tr>';
    document.getElementById("Historial").innerHTML += thtml;
}


/**
 * @method generarGrafico - Dibujara la funcion Ingresada si esta es valida.
 * @param {*} form - Objeto formulario que se pasa al hacer submit
 */

let generarGrafico = (form) => {
    form.preventDefault();
    const funciontext = (document.getElementById("funcion").value);
    const modifiedInput = funciontext.replaceAll("X", 'x');
    if (funciontext === "" || funciontext === " ") {
        AlertaERRORCampo();
    }
    try {
        if (checkValido((x) => (-Math.fround(eval(modifiedInput)))) === true) {
            let color = document.getElementById("colorgraf").value;
            dibujar((x) => (-Math.fround(eval(modifiedInput))), color, 1);
            agregarHistorial(modifiedInput, (document.querySelector('#colorgraf option:checked').textContent));
        }
    } catch (error) {
        AlertaERRORCampo();
        document.getElementById("funcion").value = "";
    }
}


/**
 * @method insert_b - Inserta una funcion de la tabla en el campo de texto.
 * @param {string} value - valor del boton apretado.
 */
let insert_b = (value) => {
    let fun = document.getElementById("funcion");
    fun.value = fun.value + value;
}

