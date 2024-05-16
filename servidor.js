const express = require("express");
const fs = require("fs").promises;
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
app.get("/crearArchivo", async (req, res) => {
    const { nombre, contenido } = req.query;
    try {
        await fs.writeFile(nombre, contenido);
        res.send(`El archivo ${nombre} fue creado con éxito!`);
    } catch (error) {
        res.status(500).send("Algo salió mal al intentar crear el archivo...");
    }
});

// Ruta para devolver el contenido de un archivo cuyo nombre es declarado en los parámetros de la consulta recibida
app.get("/leerArchivo", async (req, res) => {
  const { nombre } = req.query;
  try {
    const data = await fs.readFile(nombre);
    res.send(data);
  } catch (error) {
    res.status(500).send("Algo salió mal...");
  }
});

// Ruta para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en los parámetros de la consulta recibida
app.get("/renombrarArchivo", async (req, res) => {
  const { nombre, nuevoNombre } = req.query;
  try {
      await fs.rename(nombre, nuevoNombre);
      res.send(`Archivo ${nombre} renombrado por ${nuevoNombre}`);
  } catch (error) {
      res.status(500).send("Algo salió mal al intentar renombrar el archivo...");
  }
});

// Ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la consulta recibida
app.get("/eliminarArchivo", async (req, res) => {
  const { nombre } = req.query;
  try {
      await fs.unlink(nombre);
      res.send(`Archivo ${nombre} eliminado con éxito`);
  } catch (error) {
      res.status(500).send("Algo salió mal al intentar eliminar el archivo...");
  }
});

app.get("*", (req, res) => {
  res.send("<h1>404 - Página no encontrada</h1><p>Lo siento, la página que buscas no existe.</p>");
});