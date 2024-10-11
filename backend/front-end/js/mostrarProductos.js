document.addEventListener("DOMContentLoaded", async function () {
  const contenedorProductos = document.querySelector(".Container-Cards"); // Contenedor donde se pintarán las Cards

  const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
  };

  try {
    // Hacer la solicitud al servidor para obtener los productos
    const response = await fetch("/api/productos");
    const productos = await response.json();

    // Iterar sobre los productos y crear las Cards
    productos.forEach((producto) => {
      // Crear la estructura de cada card
      const card = document.createElement("div");
      card.classList.add("Cards");

      const img = document.createElement("img");
      img.src = `/uploads/${producto.imagen}`; // Usamos la URL de la imagen del producto
      img.alt = producto.nombreProducto;

      const cardPriceTitle = document.createElement("div");
      cardPriceTitle.classList.add("Cards-Price-title");

      const h4 = document.createElement("h4");
      h4.innerHTML = `${producto.nombre}`;

      const h5 = document.createElement("h5");

      // Asegurarse de que el precio es un número
      const precioFormato = formatoMoneda(parseFloat(producto.precio));
      h5.innerHTML = `${precioFormato}`;

      const descripcion = document.createElement("p");
      descripcion.innerText = producto.descripcion;

      const boton = document.createElement("button");
      boton.innerText = "Ver más";

      // Añadir los elementos a la card
      cardPriceTitle.appendChild(h4);
      cardPriceTitle.appendChild(h5);
      card.appendChild(img);
      card.appendChild(cardPriceTitle);
      card.appendChild(descripcion);
      card.appendChild(boton);

      // Añadir la card al contenedor
      contenedorProductos.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});
