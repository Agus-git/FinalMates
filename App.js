const button = document.getElementById("btn");
button.addEventListener("click", () => Motor())

function Motor()
{
    var cir1 = new Circulo(document.getElementById("Cir1").value,document.getElementById("PosX1").value,document.getElementById("PosY1").value)
    var cir2 = new Circulo(document.getElementById("Cir2").value,document.getElementById("PosX2").value,document.getElementById("PosY2").value)
    
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
    constructor(tamaño,x,y)
    {
        this.tamaño = tamaño;
        this.x = Number(x);
        this.y = Number(y);
    }
}