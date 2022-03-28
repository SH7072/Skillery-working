const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);
async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const fullname = document.getElementById("fullname").value;
  const college = document.getElementById("college").value;
  const degree = document.getElementById("degree").value;
  const passing = document.getElementById("year").value;
  console.log({username, email, password});

  const result = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
      fullname,
      college,
      degree,
      passing
    }),
  }).then((res) => res.json());
  
  if (result.status === "ok") {
    // everythig went fine
    alert("Success");
    window.location.href = "/login";
  } else {
    alert(result.error);
  }
}
