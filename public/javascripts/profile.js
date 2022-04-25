function openForm() {
  document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}
document.getElementById("edit").addEventListener("click", function (e) {
  console.log("Clicked");
  openForm();
});

document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const degree = document.getElementById("Degree").value;
  const college = document.getElementById("College").value;
  const year = document.getElementById("year").value;

  console.log(id, name, degree, college);

  const result = await fetch("http://localhost:8080/updateprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      degree,
      college,
      year
    }),
  }).then((res) => res.json());
  if (result.status === "ok") {
    alert("Success");
    window.location.href = "/learner-profile";
  } else {
    alert(result.error);
    closeForm();
  }
});
