// 공통 JavaScript 코드 (기존 코드 + 모바일 메뉴)

document.addEventListener('DOMContentLoaded', function() {
    // ================ 기존 드롭다운 코드 ================
    const paperSubmission = document.getElementById('paper-submission');
    if (paperSubmission) {
        paperSubmission.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = document.getElementById('dropdown-container');
            dropdown.classList.toggle('show');
            this.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('#paper-submission')) {
            const dropdown = document.getElementById('dropdown-container');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                const paperSubmission = document.getElementById('paper-submission');
                if (paperSubmission) {
                    paperSubmission.classList.remove('active');
                }
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
            const dropdown = document.getElementById('dropdown-container');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
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

    // ================ 모바일 메뉴 코드 ================
    // 요소 선택
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileSideMenu = document.getElementById('mobileSideMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // 모바일 메뉴 열기
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileSideMenu) mobileSideMenu.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        });
    }
    
    // 모바일 메뉴 닫기
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // 오버레이 클릭 시 메뉴 닫기
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // 메뉴 닫기 함수
    function closeMobileMenu() {
        if (mobileSideMenu) mobileSideMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
    }
    
    // 아코디언 메뉴 토글
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const content = this.nextElementSibling;
            if (content) {
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            }
        });
    });
    
    // 기본적으로 첫 번째 아코디언 메뉴 열기 (Paper Submission / Status)
    accordionHeaders.forEach(header => {
        const content = header.nextElementSibling;
        if (content) {
            content.style.maxHeight = '0';
        }
    });
    
    // 윈도우 리사이즈 시 모바일 메뉴 상태 관리
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // 데스크탑 화면에서는 모바일 메뉴 닫기
            closeMobileMenu();
        }
    });
});