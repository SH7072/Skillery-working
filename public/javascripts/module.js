// document.getElementsByClassName("addday").addEventListener("click", function(e) {
//     console.log("Clicked");
//     openform();
// })
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
document.getElementById("addday").addEventListener("click", function(e){
    console.log("Clicked");
    openForm();
});

document.getElementById("submit").addEventListener("click", async function(e){
    e.preventDefault();

    const lectureLink = document.getElementById("link").value;
    const homeworkLink = document.getElementById("homework").value;

    console.log(lectureLink, homeworkLink);

    const result = await fetch("/api/addLecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lectureLink,
            homeworkLink
        }),
      }).then((res) => res.json());
      closeForm();
})