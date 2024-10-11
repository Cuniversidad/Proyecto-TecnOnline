// server.js
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const bd = require("./bd");

const app = express();
const PORT = 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware para analizar el cuerpo de la solicitud en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de multer para subir archivos (imágenes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});
const upload = multer({ storage: storage });

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validar que email y password no estén vacíos
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son obligatorios." });
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";

  bd.execute(query, [email], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario: ", err);
      return res.status(500).json({ message: "Error al iniciar sesión." });
    }

    // Si no se encuentra el usuario
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = results[0];

    // Comparar la contraseña (en texto plano)
    if (user.password === password) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Contraseña incorrecta" });
    }
  });
});

// Ruta para manejar el formulario de productos
app.post("/api/productos", upload.single("imagen"), (req, res) => {
  const { nombreProducto, precio, descripcion } = req.body;
  const imagen = req.file ? req.file.filename : null; // Verifica si se subió una imagen

  // Crear la consulta SQL para insertar el producto
  const sql = `INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)`;
  bd.query(
    sql,
    [nombreProducto, precio, descripcion, imagen],
    (err, result) => {
      if (err) {
        console.error("Error al insertar el producto:", err);
        return res.status(500).send("Error al insertar el producto");
      }
      res.status(200).send("Producto insertado correctamente");
    }
  );
});

// Endpoint para obtener los productos
app.get("/api/productos", (req, res) => {
  const sql = "SELECT nombre, precio, descripcion, imagen FROM productos";

  bd.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result); // Enviar la respuesta en formato JSON
  });
});

// Servir los archivos HTML y CSS
app.use(express.static(__dirname));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
