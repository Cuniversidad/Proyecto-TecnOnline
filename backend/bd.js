const mysql = require("mysql2");

//crear la conexión a la bd en mysql
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Dead",
  database: "TecnOnline",
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.stack);
    return;
  }
  console.log(
    "conectando a la base de datos MySQL como id" + connection.threadId
  );
});

module.exports = connection;
