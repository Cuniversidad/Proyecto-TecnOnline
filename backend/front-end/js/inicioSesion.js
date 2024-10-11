document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-login");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Crear un objeto con los datos del formulario
      const loginData = { email, password };

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          // Redirigir al usuario a userHome.html
          window.location.href = "../html/userHome.html";
        } else {
          alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema con la solicitud.");
      }
    });
  }
});
