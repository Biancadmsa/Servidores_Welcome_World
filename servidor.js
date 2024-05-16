const express = require("express");
const fs = require("fs");
const app = express();

app.listen(3002, () => {
  console.log(
    "El servidor está inicializado en el puerto http://localhost:3002"
  );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta para crear un archivo a partir de los parámetros de la consulta recibida
app.get("/crearArchivo", (req, res) => {
  const { nombre, contenido } = req.query;
  fs.writeFile(nombre, contenido, (error) => {
    if (error) {
      res.status(500).send("Algo salió mal al intentar crear el archivo...");
    } else {
      res.send(`El archivo ${nombre} fue creado con éxito!`);
    }
  });
});

// Ruta para devolver el contenido de un archivo cuyo nombre es declarado en los parámetros de la consulta recibida
app.get("/leerArchivo", (req, res) => {
  const { nombre } = req.query;
  fs.readFile(nombre, (error, data) => {
    if (error) {
      res.status(500).send("Algo salió mal...");
    } else {
      res.send(data);
    }
  });
});

// Ruta para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en los parámetros de la consulta recibida
app.get("/renombrarArchivo", (req, res) => {
  const { nombre, nuevoNombre } = req.query;
  fs.rename(nombre, nuevoNombre, (error) => {
    if (error) {
      res.status(500).send("Algo salió mal al intentar renombrar el archivo...");
    } else {
      res.send(`Archivo ${nombre} renombrado por ${nuevoNombre}`);
    }
  });
});

// Ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la consulta recibida
app.get("/eliminarArchivo", (req, res) => {
  const { nombre } = req.query;
  fs.unlink(nombre, (error) => {
    if (error) {
      res.status(500).send("Algo salió mal al intentar eliminar el archivo...");
    } else {
      res.send(`Archivo ${nombre} eliminado con éxito`);
    }
  });
});

app.get("*", (req, res) => {
  res.send("<h1>404 - Página no encontrada</h1><p>Lo siento, la página que buscas no existe.</p>");
});