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
  const fullname = document.getElementById("fullname").value;
  const college = document.getElementById("college").value;
  const degree = document.getElementById("degree").value;
  const passing = document.getElementById("year").value;
  const dsa = "0";
  const web = "0";
  console.log({username, email, password});
  if(ValidateEmail(email)){
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
      passing,
      dsa,
      web
    }),
  }).then((res) => res.json());
  
  if (result.status === "ok") {
    // everythig went fine
    alert("Success");
    window.location.href = "/admin-learnerslist";
  } else {
    alert(result.error);
  }}
  else{
    alert("Invalid email format");
  }
}
