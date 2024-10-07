// server.js
const express = require("express");
const bodyParser = require("body-parser");
const bd = require("./bd");

const app = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de la solicitud en JSON
app.use(bodyParser.json());

// Ruta para manejar el registro de usuarios
app.post("/registro", (req, res) => {
  const { username, email, password } = req.body;

  // lógica para guardar el usuario en la base de datos
  const query =
    "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";

  bd.execute(query, [username, email, password], (err, results) => {
    if (err) {
      console.error("Error al insertar el usuario:", err);
      res.status(500).json({ message: "Error al registrar el usuario" });
      return;
    }

    console.log(`Usuario registrado: ${username}, Email: ${email}`);

    // Enviar una respuesta exitosa
    res.status(200).json({ message: "Usuario registrado exitosamente" });
  });
});

// Servir los archivos HTML y CSS
app.use(express.static(__dirname));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
