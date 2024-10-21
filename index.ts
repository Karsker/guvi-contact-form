let formElem = <HTMLFormElement>document.querySelector('#contact-form');

// Function to execute at every form submit
formElem?.addEventListener('submit', async (e:SubmitEvent) => {
    e.preventDefault();
    const data:FormData = new FormData(formElem);
    
    // Check if phone number is valid (other checks are performed by HTML)
    const phoneNumber = <string>data.get('phone');
    const regex = /^\d{10}$/;
    if (!regex.exec(phoneNumber)) {
        alert('Please enter a valid phone number');
        return;
    }

    // Send the data
    const userName = <string>data.get('name');
    const email = <string>data.get('email');
    const subject = <string>data.get('subject');
    const message = <string>data.get('message');
   
    const url = 'https://67160dc733bc2bfe40bc2ca3.mockapi.io/api/contact/messages';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                email: email,
                phone: phoneNumber,
                subject: subject,
                message: message
            })
        });

        if (response.status === 201) {
            alert('Message was sent successfuly');
            formElem.reset();
        } else {
            alert('An error occured while sending the message');
        }
    } catch(error:any) {
        console.log(error.message);
    }

});
