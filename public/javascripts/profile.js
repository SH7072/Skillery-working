function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
document.getElementById("edit").addEventListener("click", function(e){
    console.log("Clicked");
    openForm();
});

document.getElementById("submit").addEventListener("click", async function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const degree = document.getElementById("Degree").value;
    const college = document.getElementById("College").value;

    console.log(name,degree,college);

    const result = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            degree,
            college
        }),
      }).then((res) => res.json());
      closeForm();
})