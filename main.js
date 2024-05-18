let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

// Calculos previos para todas las funciones a graficar
const imagen = document.getElementById("bg-img");
ctx.drawImage(imagen,24,-68);
const scale = 60;
let pixelStep = 1/scale;
w = canvas.width;
h = canvas.height;
cx = w/2;
cy = h/2;
step = w/40*scale;
var counter = 1;
var pixel = w/40;
const yscale = h/20;
ctx.translate(canvas.width/2,canvas.height/2);
let raiz = 0;

ctx.fillRect(0,0,1,1);





function Alerta() {
    alert("ERROR: La funcion ingresada no se puede graficar!");
}


// Dibujar funciones
function dibujar(funcion,color,ancho) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = ancho;

    for (let x = -20; x < 20; x += pixelStep) {
        y = (funcion(x)*yscale);
        yy = funcion((x+pixelStep))*yscale;
        counter++;
        if (Math.abs(yy*yscale) > 100000) {
            continue;
        }
        setTimeout(function () {
            console.log("x");
        },10000)
        ctx.moveTo(x*pixel,y);
        ctx.lineTo((x+pixelStep)*pixel,yy);
        ctx.stroke();
        console.log(funcion(x).toFixed(1));
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

// Añadir math objects 





function insert_b(value) {
    let fun = document.getElementById("funcion");
    fun.value = fun.value + value;
}



class funcion {
    constructor(funcion,color,ancho) {
        this.funcion = funcion;
        this.color = color;
        this.ancho = ancho;
    }
    
}
