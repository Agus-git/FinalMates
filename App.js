const buttonStr = document.getElementById("btnStart");
const btnRandom = document.getElementById("btnRandom");
const btnRandomVD = document.getElementById("btnRandomVD");
const btnPdf = document.getElementById("btnPdf");
btnPdf.addEventListener("click", () => Pdf())
buttonStr.addEventListener("click", () => Motor())
btnRandom.addEventListener("click", () => Randomizador())
btnRandomVD.addEventListener("click", () => RandomizadorVD())

var doc = new jspdf.jsPDF();
var PosYtxt = 0;

function Y() {
    PosYtxt = PosYtxt + 12;
    return PosYtxt;
}

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
    var duracion = Number(document.getElementById("labelduracion").value);
    var frecuencia = Number(document.getElementById("labelfrecuencia").value);

    this.Dibujador(cir1,cir2,canvas);
    var bucle = setInterval(Repetidor,actualizador);
    var minibucle = setInterval(Calculador,frecuencia*actualizador);

    function Repetidor()
    {
        Limpieza(cir1.EcuacionVectorialDeLaRecta(r-1),canvas);
        Limpieza(cir2.EcuacionVectorialDeLaRecta(r-1),canvas);
        Dibujador(cir1.EcuacionVectorialDeLaRecta(r),cir2.EcuacionVectorialDeLaRecta(r),canvas)
        cir1.RevisarLados(r);
        cir2.RevisarLados(r);
        r++;
        //console.log(r);
        if (r>(duracion-1)) {
            clearInterval(bucle);
            clearInterval(minibucle);
            console.log(r);
        }
    }

    function Calculador() {
        //console.log(cir1.EcuacionVectorialDeLaRecta(r));
        circulo1 = cir1.EcuacionVectorialDeLaRecta(r);
        circulo2 = cir2.EcuacionVectorialDeLaRecta(r);

        DistLado(0,-1,480, circulo1);
        DistLado(0,-1,480, circulo2);
        DistLado(0,-1,-480, circulo1);
        DistLado(0,-1,-480, circulo2);
        if(DistanciaEntre2Puntos(circulo1,circulo2)<= (circulo1.tamaño/2) + (circulo2.tamaño/2))
        {
            x1 = circulo1.x;
            y1 = circulo1.y;
            r1 = circulo1.tamaño/2;

            x2 = circulo2.x;
            y2 = circulo2.y;
            r2 = circulo2.tamaño/2;

            doc.setFontSize(15);
            doc.setFont('courier');
            doc.text("Calcular la interseccion de dos circunferencias",20,10);
            PosYtxt = 20;

            doc.setFontSize(12);
            var na1 = -x1*2;
            var na2 = Math.pow(x1,2);
            var na3 = -y1*2;
            var na4 = Math.pow(y1,2);
            var na5 = Math.pow(r1,2);
            var na6 = na5+(-na2)+(-na4);
            doc.text("x^2"+txt(na1)+"x"+txt(na2)+"+y^2"+txt(na3)+"y"+txt(na4)+" = "+na5,11,Y());
            doc.text("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na5+txt(-na2)+txt(-na4),11,Y());
            doc.text("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na6,11,Y());

            var nb1 = -x2*2;
            var nb2 = Math.pow(x2,2);
            var nb3 = -y2*2;
            var nb4 = Math.pow(y2,2);
            var nb5 = Math.pow(r2,2);
            var nb6 = nb5+(-nb2)+(-nb4);
            doc.text("x^2"+txt(nb1)+"x"+txt(nb2)+"+y^2"+txt(nb3)+"y"+txt(nb4)+" = "+nb5,11,Y());
            doc.text("x^2"+txt(nb1)+"x"+"+y^2"+txt(nb3)+"y"+" = "+nb5+txt(-nb2)+txt(-nb4),11,Y());
            doc.text("x^2"+txt(nb1)+"x"+"+y^2"+txt(nb3)+"y"+" = "+nb6,11,Y());
            doc.text("",11,Y());
            doc.text("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na6,11,Y());
            doc.text("-x^2"+txt(-nb1)+"x"+"-y^2"+txt(-nb3)+"y"+" = "+(-nb6),11,Y());
            doc.text("",11,Y());

            var nc1 = na1+(-nb1);
            var nc2 = na3+(-nb3);
            var nc3 = na6+(-nb6);
            var nc4 = nc3/nc2;
            var nc5 = -nc1/nc2;
            doc.text(nc1+"x"+txt(nc2)+"y = "+nc3,11,Y());
            doc.text(nc2+"y = "+nc3+txt(-nc1)+"x",11,Y());
            doc.text("y = "+nc4+txt(nc5)+"x",11,Y());
            doc.text("",11,Y());

            var ecant = nc4+txt(nc5)+"x"
            var nd1 = Math.pow(nc4,2);
            var nd2 = (nc4*nc5)*2;
            var nd3 = Math.pow(nc5,2);
            var nd4 = na3*nc4;
            var nd5 = na3*nc5;
            var nda = Number(nd3+1);
            var ndb = Number(na1+nd2+nd5);
            var ndc = Number(nd1+nd4+(-na6));
            doc.text("x^2"+txt(na1)+"x"+"("+ecant+")^2"+txt(na3)+"*("+ecant+")"+" = "+na6,11,Y());
            doc.text("x^2"+txt(na1)+"x"+txt(nd1)+txt(nd2)+"x"+txt(nd3)+"x^2"+txt(nd4)+txt(nd5)+"x"+(-na6)+" = 0",11,Y());     
            doc.text(nda+"x^2"+txt(ndb)+"x"+txt(ndc)+" = 0",11,Y());
            doc.text("",11,Y());
            doc.text("X1 = "+(-ndb+Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda),11,Y());
            doc.text("X2 = "+(-ndb-Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda),11,Y());
            doc.text("Y1 = "+nc4+nc5*((-ndb+Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda)),11,Y());
            doc.text("Y2 = "+nc4+nc5*((-ndb-Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda)),11,Y());
            doc.addPage();
            PosYtxt = 0;
        }
    }
}

function Pdf() {
    doc.save("Informe.pdf");
    doc.close();
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
        return new Circulo(this.tamaño,this.x+this.vdx*r,this.y+this.vdy*r,this.vdx,this.vdy);
    }
    Switchvdy()
    {
        this.vdy = -this.vdy;
    }
    Switchvdx()
    {
        this.vdx = -this.vdx;
    }
    RevisarLados(r)
    {
        var circulo = this.EcuacionVectorialDeLaRecta(r);

        if (DistLado(0,-1,-480,circulo)<=this.tamaño) {
            circulo.Switchvdy();
            var final = circulo.EcuacionVectorialDeLaRecta(r*-1);
            this.x = final.x;
            this.y = final.y;
            this.vdy = final.vdy;
        }

        if (DistLado(0,-1,480,circulo)<=this.tamaño) {
            circulo.Switchvdy();
            var final = circulo.EcuacionVectorialDeLaRecta(r*-1);
            this.x = final.x;
            this.y = final.y;
            this.vdy = final.vdy;
        }

        if (Math.abs(-325 - circulo.x) <= this.tamaño) {
            circulo.Switchvdx();
            var final = circulo.EcuacionVectorialDeLaRecta(r*-1);
            this.x = final.x;
            this.y = final.y;
            this.vdx = final.vdx;
        }

        if (Math.abs(325 - circulo.x) <= this.tamaño) {
            circulo.Switchvdx();
            var final = circulo.EcuacionVectorialDeLaRecta(r*-1);
            this.x = final.x;
            this.y = final.y;
            this.vdx = final.vdx;
        }
    }
}
function DistanciaEntre2Puntos(cir1,cir2)
{
    return Math.sqrt(Math.pow(cir1.x-cir2.x,2) + Math.pow(cir1.y-cir2.y,2));
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
    document.getElementById("VdX1").value = Math.floor(Math.random()*(10-(-10))+(-10));
    document.getElementById("VdY1").value = Math.floor(Math.random()*(10-(-10))+(-10));
    document.getElementById("VdX2").value = Math.floor(Math.random()*(10-(-10))+(-10));
    document.getElementById("VdY2").value = Math.floor(Math.random()*(10-(-10))+(-10));
}

function txt(num)
{
    if (num < 0)
    {
        return num + "";
    }else
    {
        return "+" + num;
    }
}