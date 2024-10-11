document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const archivo = event.target.files[0];

    if (!archivo) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    const reader = new FileReader();

    // Cargar el archivo de imagen
    reader.readAsDataURL(archivo);

    reader.onload = function (evento) {
      const img = new Image();
      img.src = evento.target.result;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Definir el tamaño del canvas (esto afecta la compresión)
        const maxWidth = 400; // Ancho máximo (puedes ajustar este valor)
        const maxHeight = 400; // Alto máximo (puedes ajustar este valor)

        let width = img.width;
        let height = img.height;

        // Mantener la proporción de la imagen
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Redimensionar la imagen en el canvas
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir el canvas en una imagen comprimida
        const calidad = 0.8; // Calidad de la imagen (0 a 1, 1 es sin compresión)
        const imagenComprimida = canvas.toDataURL("image/jpeg", calidad);

        // Mostrar la imagen comprimida en la página
        const imgPreview = document.getElementById("imagen-preview");
        imgPreview.src = imagenComprimida;
      };
    };
  });

document.addEventListener("DOMContentLoaded", () => {
  const formVender = document.querySelector(".form-vender");

  if (formVender) {
    formVender.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nombreProducto = document.getElementById("nombre-producto").value;
      const precio = document.getElementById("precio").value;
      const descripcion = document.getElementById("descripcion").value;
      const imagen = document.getElementById("file-input").files[0]; // Capturar la imagen seleccionada

      // Usamos FormData para enviar los datos y la imagen
      const formData = new FormData();
      formData.append("nombreProducto", nombreProducto);
      formData.append("precio", precio);
      formData.append("descripcion", descripcion);
      formData.append("imagen", imagen);

      try {
        const response = await fetch("/api/productos", {
          method: "POST",
          body: formData, // Enviamos FormData con los datos
        });

        if (response.ok) {
          alert("Producto enviado correctamente");
          // **Limpiar el formulario** después de enviar correctamente
          formVender.reset();

          // **Restablecer la previsualización de la imagen** a una imagen por defecto
          const imgPreview = document.getElementById("imagen-preview");
          imgPreview.src = "../Asets/imgs/user-286.png";
        } else {
          alert("Error al enviar el producto");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar el producto");
      }
    });
  }
});
