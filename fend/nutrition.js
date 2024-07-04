document.getElementById('nutritionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const foodName = document.getElementById('foodName').value;

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:5000/api/food/${foodName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `' ${token} '`
        }
    });
    
    const data = await response.json();

    if (response.ok) {
        // Display food details and message
        document.getElementById('foodDetails').innerText = `Nutrition: ${JSON.stringify(data.food)}, Message: ${data.consumeMessage}`;
    } else {
        console.error('Error:', data.message || 'Failed to fetch food details');
    }
});

function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    window.location.href = 'home.html';
}

function goBack() {
    window.history.back(); 
}