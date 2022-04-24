const datalist=document.getElementsByClassName('delete')

for(let i = 0; i < datalist.length; i++)
{
    datalist[i].addEventListener('click', async function(e){
        console.log(e.target.getAttribute("id"));
        const rawResponse = await fetch('http://localhost:8080/deletestudent', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ studentid: e.target.getAttribute("idd") })
        })
        window.location.reload();
    })
}