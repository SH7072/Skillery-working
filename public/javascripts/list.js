const datalist=document.getElementsByClassName('delete')

for(let i = 0; i < datalist.length; i++)
{
    datalist[i].addEventListener('click', async function(e){
        console.log(e.target.getAttribute("id"));
        const rawResponse1 = await fetch('http://localhost:8080/deletestudent', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: e.target.getAttribute("idd") })
        })
        const rawResponse2 = await fetch('http://localhost:8080/deleteinstructor', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: e.target.getAttribute("idd") })
        })
        const rawResponse3 = await fetch('http://localhost:8080/deletecompany', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: e.target.getAttribute("idd") })
        })
        window.location.reload();
    })
}