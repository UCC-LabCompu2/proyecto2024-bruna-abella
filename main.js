let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

// Calculos previos para todas las funciones a graficar.

const imagen = document.getElementById("bg-img");
ctx.drawImage(imagen,24,-68);
const scale = 100;
let pixelStep = 1/scale;
w = canvas.width; // El ancho del canvas
h = canvas.height; // El largo del canvas
step = w/40*scale; 
var pixel = w/40; // La cantidad de pixeles en el canvas que equivalen a un valor de x.
const yscale = h/20; // La cantidad de pixeles en el canvas que equivalen a un valor de y.
ctx.translate(canvas.width/2,canvas.height/2); // Movemos nuestro (0,0) al centro del canvas.



function Alerta() { // Si no se ingresa una funcion valida se le alertara al usuario.
    alert("ERROR: La funcion ingresada no se puede graficar!");
}


// Dibujar funciones
function dibujar(funcion,color,ancho) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho;

    for (let x = -20; x < 20; x += pixelStep) {
       setTimeout(function () { // Usamos timeout para simular una animacion al momento de hacer los calculos y graficar.
        y = (funcion(x)*yscale);
        yy = funcion((x+pixelStep))*yscale;

        if (Math.abs(yy*yscale) > 50000) { // Con esto buscamos evitar lo maximo posible graficar cosas fuera del canvas.
            return;
        }
        ctx.moveTo(x*pixel,y); 
        ctx.lineTo((x+pixelStep)*pixel,yy);
        ctx.stroke();
        console.log(funcion(x).toFixed(1));
       },1000)
    }
}

let graficoForm = document.getElementById("form-graph");

graficoForm.addEventListener("submit", (form)=>{
    form.preventDefault();
    let funciontext = (document.getElementById("funcion").value);
    if (funciontext == "") {Alerta();}
    let color = document.getElementById("colorgraf").value;
    dibujar((x)=>(-Math.fround(eval(funciontext))),color,1);
});


function insert_b(value) {
    let fun = document.getElementById("funcion");
    fun.value = fun.value + value;
}

