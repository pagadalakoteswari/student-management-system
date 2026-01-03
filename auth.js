document.addEventListener('DOMContentLoaded', () => {
    // Role selection Logic
    const roleBtns = document.querySelectorAll('.role-btn');
    let selectedRole = 'admin';

    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => {
                b.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
                b.classList.add('text-slate-500');
            });
            btn.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
            btn.classList.remove('text-slate-500');
            selectedRole = btn.dataset.role;
        });
    });

    // Login Form Submit
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        
        if (user) {
            localStorage.setItem('userRole', selectedRole);
            localStorage.setItem('userName', user);
            window.location.href = 'dashboard.html';
        }
    });
});