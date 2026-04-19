// script.js
async function getMessage() {
    try {
        // 1. Fetch data from your Express server
        const response = await fetch('http://localhost:5000/api/message');
        
        // 2. Convert the response to JSON
        const data = await response.json();
        
        // 3. Find the HTML element and update its text
        const displayElement = document.getElementById('display');
        if (displayElement) {
            displayElement.innerText = data.text;
        }
    } catch (error) {
        console.error("Could not connect to backend:", error);
    }
}

// Run the function when the script loads
getMessage();

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}