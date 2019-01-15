

( () => {
    let url = '/api-credential/signup';

    let DOMElements = {
        username:    document.getElementById('su_username'),
        password:    document.getElementById('su_password'),
        firstName:   document.getElementById('su_firstname'),
        lastName:    document.getElementById('su_lastname'),
        description: document.getElementById('su_description'),
        avatarURL:   document.getElementById('su_avatar'),
        email:       document.getElementById('su_email'),
        btn:         document.getElementById('btn-signup')
    }

    DOMElements.btn.addEventListener('click', (event) => {
        event.preventDefault();
                
        let formData = new FormData();
        formData.append('username',  DOMElements.username.value);
        formData.append('password',  DOMElements.password.value);
        formData.append('firstName',  DOMElements.firstName.value);
        formData.append('lastName',  DOMElements.lastName.value);
        formData.append('description',  DOMElements.description.value);
        formData.append('avatarURL',  DOMElements.avatarURL.value);
        formData.append('email',  DOMElements.email.value);
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then( res => res.json())
        .then(res => {
            console.log(res);
            
            if( res.success){
                window.location = '/signin'
            }
        })
        .catch( error => {
            console.log(error);
        })
    }); 

/* 
    username
    password
    firstName
    lastName
    description
    avatarURL
    email
    */

})();
