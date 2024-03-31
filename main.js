let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

// Calculos previos para todas las funciones a graficar
const scale = 100;
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


dibujar((x)=>-Math.fround((Math.pow(x,5)*4)+(Math.pow(x,2)*5)+0),"black",1);

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

// reference

/*
    var ctx = canvas.getContext("2d");
    var h = canvas.height;    
    var w = canvas.width;
    var cw = w / 2; // centers
    var ch = h / 2; 
    var subStepCount = 10;  // number of sub setps
    var scale = 10;         // scale of the plot

  
    function plot(func,col,lineWidth){
        var invScale = 1 / scale;    // inverted scale is the size of a pixel
        var top = ch * invScale;     // get top and bottom
        var bottom = -ch * invScale;
        var subStep = invScale / subStepCount; // get the sub steps between pixels
        var x,y,yy,xx,subX;                    // xx,yy are the coords of prev point
        var start = (-cw - 1) * invScale;      // get the start and end
        var end = (cw + 1) * invScale;
        // set render styles
        ctx.strokeStyle = col;
        ctx.lineWidth = lineWidth * invScale; // scale line to be constant size

        ctx.beginPath();
        for(x = start; x < end; x += invScale){ // pixel steps
            for(subX = 0; subX < invScale; subX += subStep){  // sub steps
                y = func(x+subX);                    // get y for x 
                if(yy !== undefined){                // is this not the first point
                    if(y > top || y < bottom){       // this y outside ?
                        if(yy < top && yy > bottom){ // last yy inside?
                            ctx.lineTo(x + subX,y);
                        }
                    } else {                         // this y must be inside
                        if(yy > top || yy < bottom){ // was last yy outside
                            ctx.moveTo(xx,yy);       // start a new path
                        }
                        if(subX === 0){              // are we at a pixel 
                            if(y > bottom && y < top){  // are we inside
                                // if the step is large then might be a line break
                                if(Math.abs(yy-y) > (top - bottom) * (1/3)){ 
                                    ctx.moveTo(x,y);  
                                }else{
                                    ctx.lineTo(x,y);
                                }
                            }
                        }
                    }
                }else{
                    if(subX === 0){
                        ctx.moveTo(x,y);
                    }
                }
                yy  = y;
                xx = x+ subX;
            }
        }
        ctx.stroke();

        
    }
        
    // set the plot scale and orientation 
    ctx.setTransform(scale,0,0,-scale,cw, ch);
    // two example function plots
    plot((x)=>Math.tan(Math.cos(x/2) * 10),"#F88",1)
    plot((x)=>Math.tan(x),"blue",2)
*/



