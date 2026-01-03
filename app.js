// --- STATE MANAGEMENT ---
let students = [...db.students];
let isEditing = false;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    renderTable(students);
    
    // Search Listener
    document.getElementById('studentSearch').addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(term));
        renderTable(filtered);
    });

    // Form Submit
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);

    // Check Dark Mode
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});

// --- NAVIGATION ---
function switchTab(tabId) {
    // Active class for sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active', 'bg-blue-50', 'text-blue-600'));
    document.getElementById(`nav-${tabId}`).classList.add('active', 'bg-blue-50', 'text-blue-600');

    // Show/Hide Views
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('students-view').classList.add('hidden');
    document.getElementById(`${tabId}-view`).classList.remove('hidden');
    
    // Update Title
    document.getElementById('page-title').innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
    
    // Animation trigger
    document.getElementById(`${tabId}-view`).classList.add('fade-in');
}

// --- DARK MODE ---
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// --- USER INFO ---
function loadUser() {
    const role = localStorage.getItem('userRole') || 'Admin';
    const name = localStorage.getItem('userName') || 'User';
    document.getElementById('user-name').innerText = name;
    document.getElementById('user-role').innerText = role.toUpperCase();
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// --- CRUD OPERATIONS ---

// 1. Render Table
function renderTable(data) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    
    document.getElementById('showing-count').innerText = data.length;

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400">No data found</td></tr>';
        return;
    }

    data.forEach(s => {
        const row = `
            <tr class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <td class="p-4 text-slate-500">#${s.id}</td>
                <td class="p-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        ${s.name.charAt(0)}
                    </div>
                    ${s.name}
                </td>
                <td class="p-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">${s.class}</span></td>
                <td class="p-4 text-green-600 font-bold">${s.attendance}</td>
                <td class="p-4">
                    <div class="w-full bg-slate-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${s.marks}%"></div>
                    </div>
                    <span class="text-xs text-slate-400">${s.marks}%</span>
                </td>
                <td class="p-4 text-center">
                    <button onclick="editStudent(${s.id})" class="text-blue-500 hover:text-blue-700 mr-3"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteStudent(${s.id})" class="text-red-500 hover:text-red-700"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 2. Add/Edit Modal
function openModal() {
    document.getElementById('studentForm').reset();
    isEditing = false;
    document.getElementById('modalTitle').innerText = "Add New Student";
    
    const modal = document.getElementById('studentModal');
    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before animating opacity
    setTimeout(() => {
        document.getElementById('modalContent').classList.add('modal-active');
    }, 10);
}

function closeModal() {
    document.getElementById('modalContent').classList.remove('modal-active');
    setTimeout(() => {
        document.getElementById('studentModal').classList.add('hidden');
    }, 300);
}

// 3. Handle Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('inpName').value;
    const grade = document.getElementById('inpClass').value;
    const marks = document.getElementById('inpMarks').value;
    const att = document.getElementById('inpAtt').value;

    if (!isEditing) {
        // Create
        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 101,
            name: name,
            class: grade,
            attendance: att || '0%',
            marks: marks
        };
        students.push(newStudent);
    } else {
        // Update
        const id = parseInt(document.getElementById('editId').value);
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], name, class: grade, marks, attendance: att };
        }
    }

    renderTable(students);
    closeModal();
}

// 4. Edit Setup
function editStudent(id) {
    const s = students.find(x => x.id === id);
    if (!s) return;

    document.getElementById('editId').value = s.id;
    document.getElementById('inpName').value = s.name;
    document.getElementById('inpClass').value = s.class;
    document.getElementById('inpMarks').value = s.marks;
    document.getElementById('inpAtt').value = s.attendance;

    isEditing = true;
    document.getElementById('modalTitle').innerText = "Edit Student";
    
    const modal = document.getElementById('studentModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('modalContent').classList.add('modal-active');
    }, 10);
}

// 5. Delete
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        renderTable(students);
    }
}