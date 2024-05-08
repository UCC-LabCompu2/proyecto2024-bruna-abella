let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

// Calculos previos para todas las funciones a graficar
const imagen = document.getElementById("bg-img");
ctx.drawImage(imagen,30,-68);
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
    let color = document.getElementById("colorgraf").value;
    dibujar((x)=>(-Math.fround(eval(funciontext))),color,1);
})





// OLD

/*
let lengtpxx = Math.round(canvas.width/160);
let lengtpxy = Math.round(canvas.height/160);
console.log(canvas.clientWidth);
console.log(lengtpxx);


for (let i = 0; i <= (160); i++) {
    ctx.beginPath();

    ctx.strokeStyle = "grey";
    console.log(i*lengtpxx*10);
    //Vertical 
    ctx.moveTo(i*lengtpxx*2,0);
    ctx.lineTo(i*lengtpxx*2,canvas.height);
    if ((i*lengtpxx*2) == (canvas.height/2)) {
        ctx.strokeStyle = "red";
    }
    ctx.stroke();
    //Horizontal
    ctx.moveTo(0,i*lengtpxy*2);
    ctx.lineTo(canvas.width,i*lengtpxy*2);
    ctx.stroke();
}
ctx.closePath();

let fx = [];
ctx.translate(0,canvas.height/2);
function f(x) {
    console.log("fx: ",x);
    console.log(-Math.pow(x,5));
    return -Math.pow(x,2);
}

for (let x = -40; x < 40; x += 0.5) {
    fx.push(f(x));
}
// Draw pow (x,2)

for (let index = 0; index < 160; index += 0.5) {
    ctx.beginPath();
    ctx.moveTo(index*lengtpxx,fx[index]);
    ctx.lineTo((index+1)*lengtpxx,fx[index+1])
    ctx.stroke();
}

*/

