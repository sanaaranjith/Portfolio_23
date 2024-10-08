document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new formData(form);
        
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();

        let isValid = true;

        // Name validation
        if (name === "") {
            showError(nameField, "Full Name can't be blank");
            isValid = false;
        } else {
            hideError(nameField);
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            showError(emailField, "Email can't be blank");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError(emailField, "Enter a valid email address");
            isValid = false;
        } else {
            hideError(emailField);
        }

        // Phone number validation
        const phonePattern = /^\d+$/;
        let phoneValid = true;

        if (phone === "") {
            showError(phoneField, "Phone Number can't be blank");
            isValid = false;
        } else {
            hideError(phoneField);
        }

        if (phone.length > 10) {
            showError(phoneField, "Phone number should not exceed 10 digits");
            isValid = false;
            phoneValid = false;
        }

        if (!phonePattern.test(phone)) {
            showError(phoneField, "The phone number should not have characters");
            isValid = false;
            phoneValid = false;
        }

        if (phoneValid) {
            hideError(phoneField);
        }

        // Subject validation
        if (subject === "") {
            showError(subjectField, "Subject can't be blank");
            isValid = false;
        } else {
            hideError(subjectField);
        }

        // Message validation
        const messageWords = message.split(/\s+/).filter(Boolean).length;
        if (message === "") {
            showError(messageField, "Message can't be blank");
            isValid = false;
        } else if (messageWords > 100) {
            showError(messageField, "Message can't exceed 100 words");
            isValid = false;
        } else {
            hideError(messageField);
        }

        if (isValid) {
            // Submit the form or do whatever you want upon successful validation
            alert("Form submitted successfully!");
        }
    });
});

const textOptions = ["Frontend Designer", "BTech Graduate", "Web Developer", "Tech Enthusiast"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const changingText = document.getElementById('changing-text');
const typingSpeed = 100; // Speed for typing
const deletingSpeed = 50; // Speed for backspacing
const delayBetweenTexts = 2000; // Delay before typing the next text

function typeEffect() {
    const currentText = textOptions[currentIndex]; // Current word from array

    if (!isDeleting && charIndex <= currentText.length) {
        // Typing the text
        changingText.textContent = currentText.slice(0, charIndex++);
        setTimeout(typeEffect, typingSpeed);
    } 
    else if (isDeleting && charIndex >= 0) {
        // Deleting the text
        changingText.textContent = currentText.slice(0, charIndex--);
        setTimeout(typeEffect, deletingSpeed);
    } 
    else if (!isDeleting && charIndex === currentText.length) {
        // Pause after typing the word before deleting
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, delayBetweenTexts);
    } 
    else if (isDeleting && charIndex === 0) {
        // Move to the next word after deleting
        isDeleting = false;
        currentIndex = (currentIndex + 1) % textOptions.length; // Loop through textOptions
        setTimeout(typeEffect, typingSpeed);
    }
}

// Start the typing effect
typeEffect();
