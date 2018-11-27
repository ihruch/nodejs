(function(){
    let dataFOrm = {
        name:  '',
        email: '',
        phone: '',
        msg:   ''
    };

    const data = () => {
        return dataForm = {
            name:  document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            msg:   document.getElementById("message").value
        }
    } 

    const clearData = () => { 
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("message").value = '';
    }
        
    
    const btn = document.getElementById("sendMessageButton");
    
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const params = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( data() )
        }
        
        fetch('/contact', params)
            .then( data => {
                // console.log("contact", data);
                clearData();
        });
    });

})();

