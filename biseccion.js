
var f;
var a;
var b;
var T;
var N;
var result;
var tabla;

function inicializar(){
    graficar(-1,1,"0");
    tabla = document.getElementById("table")
    result = document.getElementById("result")
}

function ejecutar(){        
    obtenerParametros();
    console.log(f(2))
    biseccion()
    graficar()
}

function obtenerParametros(){
    fExpresion = document.getElementById("f").value;
    f = function (parametro){
        const expresionFormateada = math.parse(fExpresion)
        const expresionCompilada = expresionFormateada.compile()
        let variables = {x: parametro}
        return expresionCompilada.evaluate(variables);
    }
    a = parseFloat(document.getElementById("a").value);
    b = parseFloat(document.getElementById("b").value);
    T = parseFloat(document.getElementById("T").value);
    N = parseInt(document.getElementById("N").value);    
}

function graficar(a,b,f){
    var parameters = {
        target: '#plot',
        data: [{
          fn: 'sin(x)', 
          color: 'red'
       }],
        grid: true,
        yAxis: {domain: [-1, 1]},
        xAxis: {domain: [0, 2*Math.PI]}
      };
              
        var xMin = a
        var xMax = b
        var yMin = -2
        var yMax = 2
        var color = "red";
        
        parameters.data[0].fn = f;
        parameters.xAxis.domain = [xMin, xMax];
        parameters.yAxis.domain = [yMin, yMax];
        parameters.data[0].color = color;
        
        functionPlot(parameters);                  
}

async function biseccion(){
    table.innerHTML = "<tr><th>n</th><th>a</th><th>b</th><th>p</th><th>f(p)</th></tr>"
    let n = 1;        
    FA = f(a);
    while(n <= N){
        const p = (a + b)/2;
        FP = f(p)
        //Adicionamos a la tabla
        graficar(a,b,fExpresion)
        await new Promise(r => setTimeout(r, 250));
        table.insertRow(-1).innerHTML = "<td>"+n+"</td>"+"<td>"+a+"</td>"+"<td>"+b+"</td>"+"<td>"+p+"</td>"+"<td>"+FP+"</td>"
        if(FP == 0 || (b-a)/2 < T){
            result.innerHTML = "x &asymp; " + p
            return;            
        }
        n += 1;
        if(FA*FP > 0){
            a = p;
            FA = FP;
        } else {
            b = p;
        }            
    }
    result.innerHTML =  "Procedimiento terminado sin exito"
    return;
    //const resultado = document.getElementById("resultado");
    //resultado.innerHTML = "Ok"
}