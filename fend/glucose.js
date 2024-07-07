document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const filterButton = document.getElementById('filterButton');
    const trackButton = document.getElementById('trackButton');
    const dateInput = document.getElementById('date');
    const glucoseLevelInput = document.getElementById('glucoseLevel');
    const filterYearInput = document.getElementById('filterYear');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const token = localStorage.getItem('token');

    addButton.addEventListener('click', async () => {
        const date = dateInput.value;
        const glucoseLevel = glucoseLevelInput.value;

        if (date && glucoseLevel) {
            await addRecord(date, glucoseLevel);
            clearInputs();
            await loadRecords();
        } else {
            alert('Please enter both date and glucose level.');
        }
    });

    filterButton.addEventListener('click', async () => {
        const year = filterYearInput.value;
        if (year) {
            await filterRecordsByYear(year);
        } else {
            alert('Please enter a year.');
        }
    });

    trackButton.addEventListener('click', async () => {
        const year = filterYearInput.value;
        if (year) {
            await trackRecordsByYear(year);
        } else {
            alert('Please enter a year.');
        }
    });

    async function addRecord(date, glucoseLevel) {
        try {
            const response = await fetch('http://localhost:5000/api/glt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date, glucose_level: glucoseLevel })
            });
            if (!response.ok) {
                throw new Error('Failed to add record');
            }
        } catch (error) {
            console.error(error.message);
            alert('Error adding record');
        }
    }

    async function loadRecords() {
        try {
            const response = await fetch('http://localhost:5000/api/glt', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const records = await response.json();
            displayRecords(records);
        } catch (error) {
            console.error(error.message);
            alert('Error loading records');
        }
    }

    function displayRecords(records) {
        dataTable.innerHTML = '';
        records.forEach(record => {
            const newRow = dataTable.insertRow();

            const dateCell = newRow.insertCell(0);
            const levelCell = newRow.insertCell(1);
            const editCell = newRow.insertCell(2);
            const deleteCell = newRow.insertCell(3);

            dateCell.textContent = record.date.split('T')[0];
            levelCell.textContent = record.glucose_level;
            editCell.innerHTML = '<button>Edit</button>';
            deleteCell.innerHTML = '<button>Delete</button>';

            editCell.addEventListener('click', () => editRecord(newRow, record._id));
            deleteCell.addEventListener('click', () => deleteRecord(record._id));
        });
    }

    async function editRecord(row, id) {
        const dateCell = row.cells[0];
        const levelCell = row.cells[1];

        dateInput.value = dateCell.textContent;
        glucoseLevelInput.value = levelCell.textContent;

        addButton.textContent = 'Update';
        addButton.removeEventListener('click', addRecord);
        addButton.addEventListener('click', async () => {
            await updateRecord(id);
            clearInputs();
            addButton.textContent = 'Add';
            await loadRecords();
        });
    }

    async function updateRecord(id) {
        try {
            const date = dateInput.value;
            const glucoseLevel = glucoseLevelInput.value;
            const response = await fetch(`http://localhost:5000/api/glt/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date, glucose_level: glucoseLevel })
            });
            if (!response.ok) {
                throw new Error('Failed to update record');
            }
            await deleteRecord(id);
        } catch (error) {
            console.error(error.message);
            alert('Error updating record');
        }
    }

    async function deleteRecord(id) {
        try {
            const response = await fetch(`http://localhost:5000/api/glt/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete record');
            }
            await loadRecords();
        } catch (error) {
            console.error(error.message);
            alert('Error deleting record');
        }
    }

    async function filterRecordsByYear(year) {
        try {
            const response = await fetch(`http://localhost:5000/api/glt/year/${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to filter records');
            }
    
            const records = await response.json();
            displayRecords(records);
        } catch (error) {
            console.error(error.message);
            alert('Error filtering records');
        }
    }

    async function trackRecordsByYear(year) {
        try {
            const response = await fetch(`http://localhost:5000/api/glt/year/${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const records = await response.json();
            displayChart(records);
        } catch (error) {
            console.error(error.message);
            alert('Error tracking records');
        }
    }
    
    function displayChart(records) {
        const ctx = document.getElementById('chartContainer').getContext('2d');
        const labels = records.map(record => record.month);
        const data = records.map(record => record.glucose_level);
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Glucose Level',
                    data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Glucose Level (mg/dL)' } }
                }
            }
        });
    }

    function clearInputs() {
        dateInput.value = '';
        glucoseLevelInput.value = '';
    }

    // Load initial records
    loadRecords();
});