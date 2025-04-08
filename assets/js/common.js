document.getElementById('paper-submission').addEventListener('click', function(e) {
    e.preventDefault();
    const dropdown = document.getElementById('dropdown-container');
    dropdown.classList.toggle('show');
    this.classList.toggle('active');
});

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.matches('#paper-submission')) {
        const dropdown = document.getElementById('dropdown-container');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            document.getElementById('paper-submission').classList.remove('active');
        }
    }
});

// Set active state for menu items
const navLinks = document.querySelectorAll('.nav-link:not(#paper-submission)');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active');
        });
        // Add active class to clicked link
        this.classList.add('active');
        // Hide dropdown if open
        document.getElementById('dropdown-container').classList.remove('show');
    });
});

// 드롭다운 링크에 active 상태 추가
const dropdownLinks = document.querySelectorAll('.dropdown-link');
dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove active class from all dropdown links
        dropdownLinks.forEach(el => {
            el.classList.remove('active');
        });
        // Add active class to clicked link
        this.classList.add('active');
    });
});