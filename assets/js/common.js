// 공통 JavaScript 코드 (기존 코드 + 모바일 메뉴)

document.addEventListener('DOMContentLoaded', function() {
    // ================ 수정된 드롭다운 코드 ================
    // 모든 드롭다운 메뉴 아이템 선택
    const navDropdowns = document.querySelectorAll('.nav-item.dropdown .nav-link');
    
    // 각 드롭다운 메뉴에 이벤트 리스너 추가
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 드롭다운 컨테이너
            const dropdownContainer = document.getElementById('dropdown-container');
            
            // 드롭다운 토글
            dropdownContainer.classList.toggle('show');
            
            // active 클래스 토글
            const wasActive = this.classList.contains('active');
            
            // 모든 메뉴 항목의 active 상태 제거
            navDropdowns.forEach(item => {
                item.classList.remove('active');
            });
            
            // 클릭한 메뉴가 active가 아니었다면 active 추가
            if (!wasActive) {
                this.classList.add('active');
            }
            
            // 모든 드롭다운 콘텐츠 표시
            const dropdownContents = document.querySelectorAll('.dropdown-content');
            dropdownContents.forEach(content => {
                content.style.display = 'flex';
            });
            
            // 드롭다운이 열려있지 않으면 active 상태 모두 제거
            if (!dropdownContainer.classList.contains('show')) {
                navDropdowns.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            const dropdown = document.getElementById('dropdown-container');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                // 모든 드롭다운 메뉴의 active 상태 제거
                navDropdowns.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
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
document.addEventListener('DOMContentLoaded', function() {
  const browseBtn = document.querySelector('.btn-browse');
  const fileInput = document.getElementById('paperFile');
  const fileNameDisplay = document.querySelector('.file-name-display');
  
  if (browseBtn && fileInput && fileNameDisplay) {
    // Browse 버튼 클릭 시 파일 선택 창 열기
    browseBtn.addEventListener('click', function() {
      fileInput.click();
    });
    
    // 파일 선택 시 파일명 표시
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        fileNameDisplay.value = this.files[0].name;
      } else {
        fileNameDisplay.value = '';
      }
    });
  }
});