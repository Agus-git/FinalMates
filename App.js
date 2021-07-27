const button = document.getElementById("btn");
button.addEventListener("click", () => Motor())

function Motor()
{
    var Circulo1 = new Circulo(document.getElementById("Cir1").value,document.getElementById("PosX1").value,document.getElementById("PosY1").value)
    var Circulo2 = new Circulo(document.getElementById("Cir2").value,document.getElementById("PosX2").value,document.getElementById("PosY2").value)
    
}

class Circulo
{
    constructor(tamaño,x,y)
    {
        this.tamaño = tamaño;
        this.x = x;
        this.y = y;
    }
}