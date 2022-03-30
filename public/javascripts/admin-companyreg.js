const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("companyname").value;
  const studentsplaced = 0;

  console.log(username);

  const result = await fetch("/api/company-register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
      name
    }),
  }).then((res) => res.json());
  
  if (result.status === "ok") {
    // everythig went fine
    alert("Success");
    window.location.href = "/admin-companieslist";
  } else {
    alert(result.error);
  }
}
