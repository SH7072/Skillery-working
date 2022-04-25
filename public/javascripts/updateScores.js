const datalist=document.getElementsByClassName('update')

for(let i = 0; i < datalist.length; i++)
{
    datalist[i].addEventListener('click', async function(e){
        const id = e.target.getAttribute('idd');
        const dsa = document.getElementById('dsa'+id).value;
        const web = document.getElementById('web'+id).value;
        console.log({dsa,web});
        const rawResponse = await fetch('http://localhost:8080/updatescore', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              id,
              dsa,
              web 
          })
        })
        // window.location.reload();
    })
}