const buttonStr = document.getElementById("btnStart");
const btnRandom = document.getElementById("btnRandom");
const btnRandomVD = document.getElementById("btnRandomVD");
buttonStr.addEventListener("click", () => Motor())
btnRandom.addEventListener("click", () => Randomizador())
btnRandomVD.addEventListener("click", () => RandomizadorVD())

function Motor()
{
    /*
                Arriba
        _____________________________
        |    y`-y' |                 |
        |m = _____ | (y-y') = m(x-x')|                 
        |    x`-x' |                 |
        |____________________________|                 
        ----------|---------
        x' = -325 | x` = 325
        y' = 480  | y` = 480
        ----------|---------
        480-480      0
        -------  =  --- = 0
        325+325     650

        y-480 = 0
        y = 480

                Abajo                       Izquierda                         
        ----------|---------            ----------|---------
        x' = -325 | x` = 325            x' = -325 | x` = -325
        y' = -480 | y` = -480           y' = 480  | y` = -480
        ----------|---------            ----------|---------
        -480+480      0                 -480-480     -960
        -------  =   --- = 0            --------  =  ---- = Error
        325+325      650                -325+325       0

            y+480 = 0                       y+480 = 0
            y = -480                        y = -480



        Derecha
    */
    var r = 1;
    var actualizador = Number(document.getElementById("Actualizador").value);
    var cir1 = new Circulo(document.getElementById("Cir1").value,document.getElementById("PosX1").value,document.getElementById("PosY1").value*-1,document.getElementById("VdX1").value,document.getElementById("VdY1").value * -1);
    var cir2 = new Circulo(document.getElementById("Cir2").value,document.getElementById("PosX2").value,document.getElementById("PosY2").value*-1,document.getElementById("VdX2").value,document.getElementById("VdY2").value * -1);
    var canvas = document.getElementById("myCanvas");
    this.Dibujador(cir1,cir2,canvas);
    var bucle = setInterval(Repetidor,actualizador);
    var minibucle = setInterval(Calculador,actualizador*2/*Pendiente a cambiar a 10*/);

    function Repetidor()
    {
        Limpieza(cir1.EcuacionVectorialDeLaRecta(r-1),canvas);
        Limpieza(cir2.EcuacionVectorialDeLaRecta(r-1),canvas);
        Dibujador(cir1.EcuacionVectorialDeLaRecta(r),cir2.EcuacionVectorialDeLaRecta(r),canvas);
        r++;
        //console.log(r);
        if (r>199) {
            clearInterval(bucle);
            clearInterval(minibucle);
        }
    }

    function Calculador() {
        //console.log(cir1.EcuacionVectorialDeLaRecta(r));
        DistLado(0,-1,480, cir1.EcuacionVectorialDeLaRecta(r))
        DistLado(0,-1,480, cir2.EcuacionVectorialDeLaRecta(r))
        DistLado(0,-1,-480, cir1.EcuacionVectorialDeLaRecta(r))
        DistLado(0,-1,-480, cir2.EcuacionVectorialDeLaRecta(r))
        console.log();
    }
}

function DistLado(x,y,num,circle)
{
    return(Math.abs(x*circle.x+y*circle.y+num)/Math.sqrt(Math.pow(x,2) + Math.pow(y,2)));
}

function Dibujador(cir1,cir2,canvas)
{
    var circle = canvas.getContext("2d");
    circle.beginPath();
    circle.arc(cir1.x + (canvas.width/2),(cir1.y + canvas.height/2),cir1.tamaño,0,180);
    circle.fillStyle = "red";
    circle.fill();
    circle.stroke();

    circle.beginPath();
    circle.arc(cir2.x + (canvas.width/2),cir2.y + canvas.height/2,cir2.tamaño,0,180);
    circle.fillStyle = "green";
    circle.fill();
    circle.stroke();
}

function Limpieza(cir,canvas)
{
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect((cir.x + canvas.width/2) - cir.tamaño-2, (cir.y + canvas.height/2)- cir.tamaño-2, cir.tamaño*2+ 5, cir.tamaño*2+5);
}

class Circulo
{
    constructor(tamaño,x,y,vdx,vdy)
    {
        this.tamaño = tamaño;
        this.x = Number(x);
        this.y = Number(y);
        this.vdx = Number(vdx);
        this.vdy = Number(vdy);
    }

    EcuacionVectorialDeLaRecta(r) 
    {
        return new Circulo(this.tamaño,this.x+this.vdx*r,this.y+this.vdy*r,0,0);
    }
}

function Randomizador() {
    var canvas = document.getElementById("myCanvas");
    var x = canvas.width/2 - Number(document.getElementById("Cir1").value);
    var y = canvas.height/2;
    console.log(Math.floor(Math.random()*(20-0)+0));

    document.getElementById("PosX1").value = Math.floor(Math.random()*(x-(x*-1))+(x*-1));
    document.getElementById("PosY1").value = Math.floor(Math.random()*(y-(y*-1))+(y*-1));
    document.getElementById("PosX2").value = Math.floor(Math.random()*(x-(x*-1))+(x*-1));
    document.getElementById("PosY2").value = Math.floor(Math.random()*(y-(y*-1))+(y*-1));
}

function RandomizadorVD() {
    document.getElementById("VdX1").value = Math.floor(Math.random()*(50-(-50))+(-50));
    document.getElementById("VdY1").value = Math.floor(Math.random()*(50-(-50))+(-50));
    document.getElementById("VdX2").value = Math.floor(Math.random()*(50-(-50))+(-50));
    document.getElementById("VdY2").value = Math.floor(Math.random()*(50-(-50))+(-50));
}