const button = document.getElementById("btn");
button.addEventListener("click", () => Motor())

function Motor()
{
    var r = 1;
    var actualizador = Number(document.getElementById("Actualizador").value);
    var cir1 = new Circulo(document.getElementById("Cir1").value,document.getElementById("PosX1").value,document.getElementById("PosY1").value,document.getElementById("VdX1").value,document.getElementById("VdY1").value);
    var cir2 = new Circulo(document.getElementById("Cir2").value,document.getElementById("PosX2").value,document.getElementById("PosY2").value,document.getElementById("VdX2").value,document.getElementById("VdY2").value);
    
    var canvas = document.getElementById("myCanvas");
    this.Dibujador(cir1,cir2,canvas);
    console.log(cir1);
    setInterval(Repetidor,actualizador);

    function Repetidor()
    {
        Limpieza(cir1.EcuacionVectorialDeLaRecta(r-1),canvas);
        console.log(cir1.EcuacionVectorialDeLaRecta(r-1));
        Limpieza(cir2.EcuacionVectorialDeLaRecta(r-1),canvas);
        Dibujador(cir1.EcuacionVectorialDeLaRecta(r),cir2.EcuacionVectorialDeLaRecta(r),canvas);
        r++;
    }

}

function Dibujador(cir1,cir2,canvas)
{
    var circle = canvas.getContext("2d");
    circle.beginPath();
    circle.arc(cir1.x + (canvas.width/2),cir1.y + canvas.height/2,cir1.tamaño,0,180);
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
    ctx.clearRect((cir.x + canvas.width/2) - cir.tamaño-1, (cir.y + canvas.height/2)- cir.tamaño - 1, cir.tamaño*2, cir.tamaño*2);

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