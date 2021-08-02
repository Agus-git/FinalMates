const but = document.getElementById("btn");
but.addEventListener("click", () => Motor())

function Motor() {
    x1 = Number(document.getElementById("PosX1").value);
    y1 = Number(document.getElementById("PosY1").value);
    r1 = Number(document.getElementById("Cir1").value);

    x2 = Number(document.getElementById("PosX2").value);
    y2 = Number(document.getElementById("PosY2").value);
    r2 = Number(document.getElementById("Cir2").value);

    var na1 = -x1*2;
    var na2 = Math.pow(x1,2);
    var na3 = -y1*2;
    var na4 = Math.pow(y1,2);
    var na5 = Math.pow(r1,2);
    var na6 = na5+(-na2)+(-na4);
    console.log("x^2"+txt(na1)+"x"+txt(na2)+"+y^2"+txt(na3)+"y"+txt(na4)+" = "+na5);
    console.log("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na5+txt(-na2)+txt(-na4));
    console.log("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na6);

    var nb1 = -x2*2;
    var nb2 = Math.pow(x2,2);
    var nb3 = -y2*2;
    var nb4 = Math.pow(y2,2);
    var nb5 = Math.pow(r2,2);
    var nb6 = nb5+(-nb2)+(-nb4);
    console.log("x^2"+txt(nb1)+"x"+txt(nb2)+"+y^2"+txt(nb3)+"y"+txt(nb4)+" = "+nb5);
    console.log("x^2"+txt(nb1)+"x"+"+y^2"+txt(nb3)+"y"+" = "+nb5+txt(-nb2)+txt(-nb4));
    console.log("x^2"+txt(nb1)+"x"+"+y^2"+txt(nb3)+"y"+" = "+nb6);
    console.log(); 
    console.log("x^2"+txt(na1)+"x"+"+y^2"+txt(na3)+"y"+" = "+na6);
    console.log("-x^2"+txt(-nb1)+"x"+"-y^2"+txt(-nb3)+"y"+" = "+(-nb6));
    console.log()

    var nc1 = na1+(-nb1);
    var nc2 = na3+(-nb3);
    var nc3 = na6+(-nb6);
    var nc4 = nc3/nc2;
    var nc5 = -nc1/nc2;
    console.log(nc1+"x"+txt(nc2)+"y = "+nc3);
    console.log(nc2+"y = "+nc3+txt(-nc1)+"x");
    console.log("y = "+nc4+txt(nc5)+"x");
    console.log();
    
    var ecant = nc4+txt(nc5)+"x"
    var nd1 = Math.pow(nc4,2);
    var nd2 = (nc4*nc5)*2;
    var nd3 = Math.pow(nc5,2);
    var nd4 = na3*nc4;
    var nd5 = na3*nc5;
    var nda = Number(nd3+1);
    var ndb = Number(na1+nd2+nd5);
    var ndc = Number(nd1+nd4+(-na6));
    console.log("x^2"+txt(na1)+"x"+"("+ecant+")^2"+txt(na3)+"*("+ecant+")"+" = "+na6);
    console.log("x^2"+txt(na1)+"x"+txt(nd1)+txt(nd2)+"x"+txt(nd3)+"x^2"+txt(nd4)+txt(nd5)+"x"+(-na6)+" = 0");
    console.log(nda+"x^2"+txt(ndb)+"x"+txt(ndc)+" = 0");
    console.log();
    console.log("X1 = ",(-ndb+Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda));
    console.log("X2 = ",(-ndb-Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda));
    console.log("Y1 = ",nc4+nc5*((-ndb+Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda)));
    console.log("Y1 = ",nc4+nc5*((-ndb-Math.sqrt(Math.pow(ndb,2)-4*nda*ndc))/ (2*nda)));
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