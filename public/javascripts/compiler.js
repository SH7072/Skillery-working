const axios = require('axios');

var submit = document.getElementById("submit");

submit.addEventListener("click", function(e) {
    await axios("https://codequotient.com/api/executeCode", {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
    body:JSON.stringify({
          code:`${code}`,
          langId:lang
        })
  }).then(response => {
    console.log(response.data);
  })
})