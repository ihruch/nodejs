

( () => {
    let url = '/api-credential/signin';

    let DOMElements = {
        username:    document.getElementById('si_username'),
        password:    document.getElementById('si_password'),
        btn:         document.getElementById('btn-signin')
    }

    DOMElements.btn.addEventListener('click', (event) => {
        event.preventDefault();
        
        
        let formData = new FormData();
        formData.append('username',  DOMElements.username.value);
        formData.append('password',  DOMElements.password.value);
        
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then( res => res.json())
        .then(res => {
            // console.log(res);
            console.log('success - ', res.success);
            console.log('token - ', res.token);
            console.log('message - ', res.message);
            
            if( res.success){
                setTimeout(() => {
                    localStorage.setItem('token', res.token);
                window.location = '/';
                },1500)
            }
        })
        .catch( error => {
            console.log(error);
        })
    }); 

})();
