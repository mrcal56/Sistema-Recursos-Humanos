//const res = require("express/lib/response");

//window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
  if (localStorage.getItem("token")) {
    // token = localStorage.getItem("token");
    headers = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    loadEmp();
  } else {
    window.location.href = "inicio.html";
  }
}

//cargar empleados
function loadEmp() {
  axios
    .get(url + "/consulta", headers)
    .then(function (res) {
      console.log(res);
      displayEmp(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//eliminar empleados
function deleteEmp(id) {
  axios
    .delete(url + "/consulta/" + id, headers)
    .then(function (res) {
      console.log(res);
      alert("Empleado Eliminado Correctamente");
      window.location.href = window.location.href;
    })
    .catch(function (err) {
      console.log(err);
    });
}

//manda a llamar el empleado solicitado
function obtenerEmp(id) {
  axios
    .get(url + "/consulta/" + id, headers)
    .then(function (res) {
      console.log(res);
      modificarEmp(res.data.message);
    })
    .catch(function (err) {
      console.log(err);
    });
}

//mostrar tabla con todos los empleados
function displayEmp(empleado) {
  var body = document.querySelector("body");
  console.log(empleado);
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

  for (var i = 0; i < empleado.length; i++) {
    table.innerHTML += `<tr>
    <td>${empleado[i].nombre}</td>
    <td>${empleado[i].apellidos}</td>
    <td>${empleado[i].telefono}</td>
    <td>${empleado[i].correo}</td>
    <td>${empleado[i].direccion}</td>
    <td> <button onclick='deleteEmp(${empleado[i].emp_id})'>Eliminar</button> </td>
    <td> <button onclick='obtenerEmp(${empleado[i].emp_id})'>Actualizar</button> </td>
    </tr>`;
  }
  table.innerHTML += `</table>`;
}

//buscar por nombre a empleados y desplegar tabla
function buscarEmp(name) {
  var name = document.getElementById("input-nombre").value;
  axios
    .get(url + "/consulta/" + name, headers)
    .then(function (res) {
      console.log(res);
      var body = document.querySelector("body");
      body.innerHTML += `<table class="tablab">`;
      document.querySelector(".tablab").innerHTML = "";
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
        </table>`;
    })
    .catch(function (err) {
      console.log(err);
      alert("Empleado no encontrado")
    });
}

//obtiene los datos del empleado
function modificarEmp(empleado){
  var body = document.querySelector("body");
  console.log(empleado)
  body.innerHTML += ` <div class="container">
  <div class="row mt-5">
      <div class="col-6 offset-3">
          <h1>Actualizar Empleado</h1>
      </div>
  </div>
  <div class="row align-items-center">
      <div class="col-6 offset-3">
          <div class="form-group">
            
              <input type="hidden" class="form-control" id="input-id1" value=${empleado[0].emp_id}>
          </div>
          <div class="form-group">
              <label for="input-name">Nombre</label>
              <input type="text" class="form-control" id="input-name1" value=${empleado[0].nombre}>
          </div>
          <div class="form-group">
              <label for="input-apellido">Apellido</label>
              <input type="text" class="form-control" id="input-apellidos1" value=${empleado[0].apellidos}>
          </div>
          <div class="form-group">
              <label for="input-telefono">Telefono</label>
              <input type="number" class="form-control" id="input-telefono1" value=${empleado[0].telefono}>
          </div>
          <div class="form-group">
              <label for="input-mail">Correo electrónico</label>
              <input type="email" class="form-control" id="input-mail1" value=${empleado[0].correo}>
          </div>
          <div class="form-group">
              <label for="input-direccion">Direccion</label>
              <input type="text" class="form-control" id="input-direccion1" value=${empleado[0].direccion}>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-act" onclick="actualizarEmp()">Actualizar</button>
              
          </div>
      </div>
  </div>
</div> `;
}

//actualizar los datos del empleado
function actualizarEmp() {
  var id = document.getElementById("input-id1").value;
  var name = document.getElementById("input-name1").value;
  var apellidos = document.getElementById("input-apellidos1").value;
  var telefono = document.getElementById("input-telefono1").value;
  var mail = document.getElementById("input-mail1").value;
  var direccion = document.getElementById("input-direccion1").value;

  axios({
    method: "put",
    url: "http://localhost:3000/consulta/"+ id,
    data: {
      emp_id: id,
      nombre: name,
      apellidos: apellidos,
      telefono: telefono,
      correo: mail,
      direccion: direccion,
    },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
    }
   
  })
    .then(function (res) {
      console.log(res);
      alert("Actualizacion exitosa");
      window.location.href = "index.html";
    })
    .catch(function (err) {
      console.log(err);
      alert("Completa todos los campos")
    });
}
