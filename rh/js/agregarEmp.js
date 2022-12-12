window.onload = inicio;
var head = {};

function inicio() {
  if (localStorage.getItem("token")) {
    init();
    head = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    console.log(document.querySelector(".btn-primary"));
    document
      .querySelector(".btn-primary")
      .addEventListener("click", agregarEmp);
  } else {
    window.location.href = "inicio.html";
  }
}

function agregarEmp() {
  var name = document.getElementById("input-name").value;
  var apellidos = document.getElementById("input-apellido").value;
  var telefono = document.getElementById("input-telefono").value;
  var mail = document.getElementById("input-mail").value;
  var direccion = document.getElementById("input-direccion").value;

  axios({
    method: "post",
    url: "http://localhost:3000/consulta/",
    data: {
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
      alert("Registro exitoso");
      window.location.href = "index.html";
    })
    .catch(function (err) {
      console.log(err);
    });
}
