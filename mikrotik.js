document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  const params = new URLSearchParams(window.location.search);
  const linkLoginOnly = params.get("link-login-only") || "redirect.html";
  const mac = params.get("mac") || "";
  const ip = params.get("ip") || "";

  const data = {
    name,
    phone,
    email,
    mac,
    ip,
    user_agent: navigator.userAgent
  };

  try {
    const response = await fetch("https://app.lvit.com.br/webhook/testeaa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      window.location.href = `${linkLoginOnly}?username=${encodeURIComponent(phone)}&password=wifi`;
    } else {
      document.getElementById("message").textContent = "Erro ao enviar seus dados. Tente novamente.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("message").textContent = "Erro de conexão. Verifique a internet.";
  }
});
