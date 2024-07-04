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
        const foodDetailsElement = document.getElementById('foodDetails');
        foodDetailsElement.innerHTML = `
            <p><strong>Food:</strong> ${data.food.name}</p>
            <p><strong>Calories:</strong> ${data.food.calories}</p>
            <p><strong>Carbohydrates:</strong> ${data.food.carbohydrates}</p>
            <p><strong>Protein:</strong> ${data.food.protein}</p>
            <p><strong>Fat:</strong> ${data.food.fat}</p>
            <p><strong>Message:</strong> ${data.consumeMessage}</p>
        `;

        document.getElementById('foodName').value = '';
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