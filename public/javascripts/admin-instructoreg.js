const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const fullname = document.getElementById("fullname").value;
  const qualification = document.getElementById("qualifications").value;
  const experience = document.getElementById("experience").value;

  console.log(username);

  const result = await fetch("/api/instructor-register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
      fullname,
      qualification,
      experience
    }),
  }).then((res) => res.json());
  
  if (result.status === "ok") {
    // everythig went fine
    alert("Success");
    window.location.href = "/admin-instructorslist";
  } else {
    alert(result.error);
  }
}
