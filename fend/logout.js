function logout() {
    localStorage.removeItem('token');
    //alert('Logged out successfully');
    window.location.href = 'home.html';
}

function goBack() {
    window.history.back(); 
}