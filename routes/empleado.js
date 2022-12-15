const express = require("express");
const empleado = express.Router();
const db = require("../config/database");

//agregar empleados
empleado.post("/", async (req, res, next) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;
  if (nombre && apellidos && telefono && correo && direccion) {
    let query =
      "INSERT INTO empleado ( nombre, apellidos, telefono, correo, direccion)";
    query += ` VALUES('${nombre}', '${apellidos}', '${telefono}', '${correo}', '${direccion}')`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: "empleado insertado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

//eliminar empleados
empleado.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE from empleado where emp_id=${req.params.id}`;
  const rows = await db.query(query);
  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "empleado borrado correctamente" });
  }
  return res.status(404).json({ code: 404, message: "empleado no encontrado" });
});

//actualizar empleados
empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const { emp_id, nombre, apellidos, telefono, correo, direccion } = req.body;

  if (emp_id && nombre && apellidos && telefono && correo && direccion) {
    let query = `UPDATE empleado SET emp_id='${emp_id}',nombre='${nombre}',`;
    query += `apellidos='${apellidos}',telefono='${telefono}',correo='${correo}',direccion='${direccion}' WHERE emp_id=${req.params.id};`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "empleado actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

//actualizar id de empleado
empleado.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  if (req.body.emp_id) {
    let query = `UPDATE empleado SET emp_id='${req.body.emp_id}' WHERE emp_id=$(req.params.id)`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "empleado actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error " });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos " });
});

//obtener todos los empleados
empleado.get("/", async (req, res, next) => {
  const emp = await db.query("SELECT * FROM empleado");
  return res.status(200).json({ code: 1, message: emp });
});

//obtener empleados por id
empleado.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  if (id >= 1 && id <= 722) {
    const emp = await db.query(
      "SELECT * FROM empleado WHERE emp_id=" + id + ";"
    );
    return res.status(200).json({ code: 1, message: emp });
  }
  res.status(404).send({ code: 404, message: "empleado no encontrado" });
});

//obtener empleados por nombre
empleado.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const emp = await db.query(
    "SELECT * FROM empleado WHERE nombre='" + name + "';"
  );

  if (emp.length > 0) {
    return res.status(200).json({ code: 1, message: emp });
  }
  res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

module.exports = empleado;
