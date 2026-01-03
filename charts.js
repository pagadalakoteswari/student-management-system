document.addEventListener('DOMContentLoaded', () => {
    // 1. Earnings Chart (Line)
    const ctx1 = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Earnings',
                    data: db.stats.earnings,
                    borderColor: '#2563eb', // Blue
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: db.stats.expenses,
                    borderColor: '#facc15', // Yellow
                    backgroundColor: 'rgba(250, 204, 21, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
        }
    });

    // 2. Students Chart (Doughnut)
    const ctx2 = document.getElementById('studentsChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Boys', 'Girls'],
            datasets: [{
                data: [55, 45],
                backgroundColor: ['#2563eb', '#facc15'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            cutout: '70%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // 3. Attendance Chart (Bar)
    const ctx3 = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Present',
                data: [90, 95, 88, 92, 85],
                backgroundColor: '#2563eb',
                borderRadius: 4
            }, {
                label: 'Absent',
                data: [10, 5, 12, 8, 15],
                backgroundColor: '#cbd5e1',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, display: false } },
            plugins: { legend: { display: false } }
        }
    });
});