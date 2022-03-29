const form = document.getElementById('login')
	form.addEventListener('submit', login)
	async function login(event) {
		    event.preventDefault()
			const username = document.getElementById('username').value
			const password = document.getElementById('password').value
            const option = document.getElementById('value').value
            if(option == 1){
                const result = await fetch('/api/learner-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }).then((res) => res.json())
    
                if (result.status === 'ok') {
                    // everythign went fine
                    alert('Success')
                    window.location.href = "/learner-home";
                } else {
                    alert(result.error)
                }
            }
            else if(option == 2){
                const result = await fetch('/api/instructor-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }).then((res) => res.json())
    
                if (result.status === 'ok') {
                    // everythign went fine
                    alert('Success')
                } else {
                    alert(result.error)
                }
            }
            else if(option == 3){
                const result = await fetch('/api/company-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }).then((res) => res.json())
    
                if (result.status === 'ok') {
                    // everythign went fine
                    alert('Success')
                    window.location.href = "/company-home";
                } else {
                    alert(result.error)
                }
            }
            else if(option == 4){
                const result = await fetch('/api/admin-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }).then((res) => res.json())
    
                if (result.status === 'ok') {
                    // everythign went fine
                    alert('Success')
                    window.location.href = "/admin-home";
                } else {
                    alert(result.error)
                }
            }
    }