const button = document.getElementById("btn");
button.addEventListener("click", () => Motor())

function Motor()
{
    var r = 1
    vdx = document.getElementById("VdX1").value;
    vdy = document.getElementById("VdY1").value;
    var cir1 = new Circulo(document.getElementById("Cir1").value,document.getElementById("PosX1").value,document.getElementById("PosY1").value,vdx,vdy);
    vdx = document.getElementById("VdX2").value;
    vdy = document.getElementById("VdY2").value;
    var cir2 = new Circulo(document.getElementById("Cir2").value,document.getElementById("PosX2").value,document.getElementById("PosY2").value,vdx,vdy);
    this.Dibujador(cir1,cir2);
    console.log(cir1);
    
    setInterval(Repetidor,Number(document.getElementById("Actualizador").value));

    function Repetidor()
    {
        
        r++;
    }

}

function Dibujador(cir1,cir2)
{
    console.log("Llego");
    var canvas = document.getElementById("myCanvas");
    var circle = canvas.getContext("2d");
    circle.beginPath();
    circle.arc(cir1.x + (canvas.width/2),cir1.y + canvas.height/2,cir1.tamaño,0,180);
    circle.stroke();

    circle.beginPath();
    circle.arc(cir2.x + (canvas.width/2),cir2.y + canvas.height/2,cir2.tamaño,0,180);
    circle.stroke();
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

    get Evr(){
        return this.EcuacionVectorialDeLaRecta();
    }

    EcuacionVectorialDeLaRecta() 
    {
        return true;
    }
}