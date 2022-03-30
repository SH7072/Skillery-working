const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

function ValidateEmail(x) {

  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
      return false;
  }
  return true;
}

async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("companyname").value;

  console.log(username);
  if(ValidateEmail(email)){
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
  }}
  else{
    alert("Invalid email format");
  }
  }