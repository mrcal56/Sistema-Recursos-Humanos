//const res = require("express/lib/response");

//window.onload = init;
var headers = {};
var url = "http://localhost:3000";


function init(){
    if(localStorage.getItem("token")){
       // token = localStorage.getItem("token");
        headers ={
            headers : {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmp();
       // document.querySelector('.btn-n').addEventListener('click',buscarEmp());


    }else{
        window.location.href = "inicio.html";
    }
}

function loadEmp(){
    axios.get(url + "/consulta",headers)
    .then(function(res){
        console.log(res);
        displayEmp(res.data.message)

    }).catch(function(err){
        console.log(err);
    })
}

function deleteEmp(id){
    axios.delete(url + "/consulta/" + id ,headers)
    .then(function(res){
        console.log(res);
        alert("Empleado Eliminado Correctamente");
        window.location.href = window.location.href;
        

    }).catch(function(err){
        console.log(err);
    })
    


}

function obtenerEmp(id){
    axios.get(url + "/consulta/" + id ,headers)
    .then(function(res){
        console.log(res);
            
        modificarEmpleado(res.data.message)

    }).catch(function(err){
        console.log(err);
    })
    


}




function displayEmp(empleado){
    var body = document.querySelector("body");
    console.log(empleado)
    body.innerHTML += `<table id="p" class="tablap">
    <tr>
    <th>Nombre</th>
    <th>Apellidos</th>
    <th>Telefono</th>
    <th>Correo</th>
    <th>Direccion</th>
    <th>Eliminar</th>
    <th>Actualizar</th>
    </tr> `;
    var table = document.querySelector(".tablap");
    
    for(var i = 0; i< empleado.length; i++){
        table.innerHTML += `<tr>
    <td>${empleado[i].nombre}</td>
    <td>${empleado[i].apellidos}</td>
    <td>${empleado[i].telefono}</td>
    <td>${empleado[i].correo}</td>
    <td>${empleado[i].direccion}</td>
    <td> <button onclick='deleteEmp(${empleado[i].emp_id})'>Eliminar</button> </td>
    <td> <button onclick='obtenerEmp(${empleado[i].emp_id})'>Actualizar</button> </td>
    </tr>` ;
    }
    table.innerHTML += `</table>`

}

function buscarEmp(name){
    var name = document.getElementById("input-nombre").value;
    axios.get(url + "/consulta/" +name,headers)
    .then(function(res){
        console.log(res);
        var body = document.querySelector("body");
        body.innerHTML += `<table class="tablab">`;
        document.querySelector(".tablab").innerHTML="";
        var table = document.querySelector(".tablab");
        table.innerHTML += `<tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Telefono</th>
        <th>Correo</th>
        <th>Direccion</th>
        </tr>
        <tr>
        <td>${res.data.message[0].nombre}</td>
        <td>${res.data.message[0].apellidos}</td>
        <td>${res.data.message[0].telefono}</td>
        <td>${res.data.message[0].correo}</td>
        <td>${res.data.message[0].direccion}</td>
        </tr> 
        </table>`
        
    }).catch(function(err){
        console.log(err);
    })

}   

function refresh(){
    document.getElementById(".tablab").innerHTML="";


}



//body.innerHTML += `<h3>${empleado[i].nombre} &nbsp; ${empleado[i].apellidos} &nbsp; ${empleado[i].telefono} &nbsp; ${empleado[i].correo} &nbsp; ${empleado[i].direccion}</h3>`;