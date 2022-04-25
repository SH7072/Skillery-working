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
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
  
  function validate() {
      
    if( document.addDay.topic.value == "" ) {
       alert( "Topic Missing" );
       document.addDay.Name.focus() ;
       return false;
    }
    if( document.addDay.link.value == "" ) {
       alert( "Lecture Link Missing" );
       document.addDay.Name.focus() ;
       return false;
    }
    if( document.addDay.homework.value == "" ) {
       alert( "HomeWork Link Missing" );
       document.addDay.Name.focus() ;
       return false;
    }
    return( true );
    }