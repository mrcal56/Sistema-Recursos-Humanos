window.onload = inicio;

function inicio() {
  if (localStorage.getItem("token")) {
    head1 = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    modificarEmp();
    document.querySelector('.btn-primary').addEventListener('click',actualizarEmp());
  } else {
    window.location.href = "inicio.html";
  }
}


    


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
                <label for="input-id">Id</label>
                <input type="hidden" class="form-control" id="input-id" value=${empleado[0].emp_id}>
            </div>
            <div class="form-group">
                <label for="input-name">Nombre</label>
                <input type="text" class="form-control" id="input-name" value=${empleado[0].nombre}>
            </div>
            <div class="form-group">
                <label for="input-apellido">Apellido</label>
                <input type="text" class="form-control" id="input-apellido" value=${empleado[i].apellidos}>
            </div>
            <div class="form-group">
                <label for="input-telefono">Telefono</label>
                <input type="number" class="form-control" id="input-telefono" value=${empleado[i].telefono}>
            </div>
            <div class="form-group">
                <label for="input-mail">Correo electrónico</label>
                <input type="email" class="form-control" id="input-mail" value=${empleado[i].correo}>
            </div>
            <div class="form-group">
                <label for="input-direccion">Direccion</label>
                <input type="text" class="form-control" id="input-direccion" value=${empleado[i].direccion}>
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary">Actualizar</button>
                
            </div>
        </div>
    </div>
</div> `;
}

function actualizarEmp() {
    var id = document.getElementById("input-id").value;
    var name = document.getElementById("input-name").value;
    var apellidos = document.getElementById("input-apellido").value;
    var telefono = document.getElementById("input-telefono").value;
    var mail = document.getElementById("input-mail").value;
    var direccion = document.getElementById("input-direccion").value;
  
    axios({
      method: "put",
      url: "http://localhost:3000/consulta/",
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
      });
  }
