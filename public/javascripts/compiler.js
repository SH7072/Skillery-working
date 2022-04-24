const editor = ace.edit("code-area");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
// editor.session.setMode("ace/mode/c_cpp");
const output=document.querySelector('#output-area')
function findLang() {
  const option = document.getElementById('language-select').value
  if (option == 1) {
    return 'js'
  }
  else if (option == 2) {
    return 'py'
  }
  else if (option == 3) {
    return 'c'
  }
  else if (option == 4) {
    return 'cpp'
  }
  else if (option == 5) {
    return 'java'
  }
}


submit.addEventListener("click", function (e) {
  fetch("/get-result", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: editor.getValue(),
      lang: findLang()
    })
  }).then(response => response.json())
    .then(json=>{
      console.log(json);
      output.innerHTML=json
    }).catch(err=>{
      console.log(err)
      output.innerHTML=err;
    });
})

