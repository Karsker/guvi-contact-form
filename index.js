"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let formElem = document.querySelector('#contact-form');
// Function to execute at every form submit
formElem === null || formElem === void 0 ? void 0 : formElem.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const data = new FormData(formElem);
    // Check if phone number is valid (other checks are performed by HTML)
    const phoneNumber = data.get('phone');
    const regex = /^\d{10}$/;
    if (!regex.exec(phoneNumber)) {
        alert('Please enter a valid phone number');
        return;
    }
    // Send the data
    const userName = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');
    const url = 'https://67160dc733bc2bfe40bc2ca3.mockapi.io/api/contact/messages';
    try {
        const response = yield fetch(url, {
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
        }
        else {
            alert('An error occured while sending the message');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}));
