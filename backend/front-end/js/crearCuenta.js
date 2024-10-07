document.addEventListener("DOMContentLoaded", function () {
  // Obtener el formulario
  const formRegister = document.querySelector(".form-register");

  if (formRegister) {
    // Añadir un evento 'submit' para manejar el envío del formulario
    formRegister.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

      // Obtener los valores de los campos del formulario
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;

      // Validar contraseñas
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Crear un objeto con los datos del formulario
      const userData = {
        username: username,
        email: email,
        password: password,
      };

      try {
        // Enviar los datos al backend usando fetch()
        const response = await fetch("/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
          const result = await response.json();
          alert("¡Cuenta creada exitosamente!");
          console.log(result);
        } else {
          alert("Error al crear la cuenta.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema con la solicitud.");
      }
    });
  }
});
