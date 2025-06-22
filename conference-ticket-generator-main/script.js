// variables
const button = document.getElementById('button');
const email = document.getElementById('email');
const error = document.getElementById('error');
const imageError = document.getElementById('imageError');
const fileInput = document.getElementById('fileInput');
const fullName = document.getElementById('fullName');
const register = document.getElementById('register');
const username = document.getElementById('username');
// Get the avatar preview element
const avatarPreview = document.getElementById('avatarPreview');
// ticket variables
const ticket = document.getElementById('ticket');
const ticketName = document.getElementById('ticketName');
const ticketName1 = document.getElementById('ticketName1');
const ticketEmail = document.getElementById('ticketEmail');
const ticketUsername = document.getElementById('ticketUsername');
const ticketId = document.getElementById('ticketId');

// Function to generate a random number between 10000 and 99999
function generateRandomNumber() {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
}

// Function to check if all inputs are filled
function checkInputs() {
    return email.value.trim() !== '' && 
           fullName.value.trim() !== '' && 
           username.value.trim() !== '' && 
           avatarPreview.src !== ''; // Ensure an image is uploaded
}

// Disable the button initially
button.disabled = true;

// Add event listeners to inputs to enable/disable the button
email.addEventListener('input', toggleButton);
fullName.addEventListener('input', toggleButton);
username.addEventListener('input', toggleButton);
fileInput.addEventListener('change', toggleButton);

function toggleButton() {
    button.disabled = !checkInputs();
}

// Update the ticket section with the uploaded image
button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const emailValue = email.value.trim();
    const fullNameValue = fullName.value.trim();
    const usernameValue = username.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailValue)) {
        error.style.display = 'block';
        email.setAttribute('aria-invalid', 'true');
        email.focus();
    } else {
        error.style.display = 'none';
        email.setAttribute('aria-invalid', 'false');

        // Store fullName and email for ticket
        ticketName.innerText = fullNameValue;
        ticketName1.innerText = fullNameValue;
        ticketEmail.innerText = emailValue;
        ticketUsername.innerHTML = usernameValue;

        // Generate a random ticket ID and set it
        const randomTicketId = generateRandomNumber();
        ticketId.innerText = `#${randomTicketId}` ; // Set the ticket ID

        // Set the uploaded image in the ticket section
        ticket.querySelector('img[alt=""]').src = avatarPreview.src; // Update the ticket image
        register.style.display = 'none';
        ticket.style.display = 'block'; // Change to 'block' or your desired display style
    }
});

// Clear the error message immediately as user types/corrects
email.addEventListener('input', () => {
    if (error.style.display === 'block') {
        error.style.display = 'none';
        email.setAttribute('aria-invalid', 'false');
    }
});

// Check image size and display the uploaded image
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const fileSizeInKB = file.size / 1024; // Convert bytes to kilobytes
        if (fileSizeInKB > 500) {
            imageError.innerText = 'File too large. Please upload a photo under 500 kilobytes';
            imageError.style.display = 'inline';
            imageError.style.color = 'red';
        } else {
            imageError.innerText = 'Acceptable file size';
            imageError.style.color = "white";
            // Create a URL for the uploaded image and set it as the src for the avatar preview
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarPreview.src = e.target.result; // Set the avatar preview to the uploaded image
                avatarPreview.style.display = 'block'; // Show the avatar preview
            };
            reader.readAsDataURL(file);
        }
    }
});
