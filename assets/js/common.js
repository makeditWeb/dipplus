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


// mypage 드롭다운
// My Page 드롭다운 JavaScript (기존 JavaScript 파일 맨 아래에 추가)

document.addEventListener('DOMContentLoaded', function() {
    // My Page 드롭다운 요소들
    const myPageDropdown = document.getElementById('myPageDropdown');
    const myPageDropdownMenu = document.getElementById('myPageDropdownMenu');
    const myPageDropdownOverlay = document.getElementById('myPageDropdownOverlay');

    // My Page 클릭 이벤트
    if (myPageDropdown) {
        myPageDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMyPageDropdown();
        });
    }

    // My Page 드롭다운 메뉴 아이템 클릭 이벤트
    const myPageDropdownItems = document.querySelectorAll('.mypage-dropdown-menu__item');
    myPageDropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('My Page Menu Clicked:', this.textContent);
            closeMyPageDropdown();
            // 여기에 각 메뉴 아이템에 대한 액션을 추가할 수 있습니다
            // 예: 페이지 이동, 모달 열기 등
        });
    });

    // My Page 오버레이 클릭시 드롭다운 닫기
    if (myPageDropdownOverlay) {
        myPageDropdownOverlay.addEventListener('click', closeMyPageDropdown);
    }

    // ESC 키로 My Page 드롭다운 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMyPageDropdown();
        }
    });

    // My Page 드롭다운 토글 함수
    function toggleMyPageDropdown() {
        const isActive = myPageDropdown && myPageDropdown.classList.contains('mypage-active');
        
        if (isActive) {
            closeMyPageDropdown();
        } else {
            openMyPageDropdown();
        }
    }

    // My Page 드롭다운 열기 함수
    function openMyPageDropdown() {
        if (myPageDropdown) myPageDropdown.classList.add('mypage-active');
        if (myPageDropdownMenu) myPageDropdownMenu.classList.add('mypage-active');
        if (myPageDropdownOverlay) myPageDropdownOverlay.classList.add('mypage-active');
    }

    // My Page 드롭다운 닫기 함수
    function closeMyPageDropdown() {
        if (myPageDropdown) myPageDropdown.classList.remove('mypage-active');
        if (myPageDropdownMenu) myPageDropdownMenu.classList.remove('mypage-active');
        if (myPageDropdownOverlay) myPageDropdownOverlay.classList.remove('mypage-active');
    }

    // 창 밖 클릭시 My Page 드롭다운 닫기 (기존 nav 드롭다운과 독립적으로 작동)
    document.addEventListener('click', function(e) {
        // My Page 드롭다운 영역이 아닌 곳을 클릭했을 때만 닫기
        if (!e.target.closest('.nav__menu-item--mypage')) {
            closeMyPageDropdown();
        }
    });
});


// Dietary Requirement 라디오 버튼 기능
document.addEventListener('DOMContentLoaded', function() {
    initDietaryRequirement();
});

function initDietaryRequirement() {
    const radioButtons = document.querySelectorAll('input[name="dietary"]');
    const otherInputContainer = document.getElementById('otherInputContainer');
    const otherInput = document.getElementById('dietaryOtherText');

    // 라디오 버튼이 없으면 함수 종료
    if (!radioButtons.length || !otherInputContainer || !otherInput) {
        return;
    }

    // 라디오 버튼 변경 이벤트
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            handleDietaryChange(this, otherInputContainer, otherInput);
        });
    });

    // Other 입력 박스 이벤트
    setupOtherInputEvents(otherInput);
}

function handleDietaryChange(selectedRadio, otherInputContainer, otherInput) {
    if (selectedRadio.value === 'other' && selectedRadio.checked) {
        // Other 선택 시 입력 박스 표시
        showOtherInput(otherInputContainer, otherInput);
    } else {
        // 다른 옵션 선택 시 입력 박스 숨김
        hideOtherInput(otherInputContainer, otherInput);
    }
}

function showOtherInput(container, input) {
    container.classList.add('show');
    
    // 애니메이션 후 포커스
    setTimeout(() => {
        input.focus();
    }, 150);
}

function hideOtherInput(container, input) {
    container.classList.remove('show');
    input.value = ''; // 입력값 초기화
    input.classList.remove('error'); // 에러 상태 제거
}

function setupOtherInputEvents(otherInput) {
    // 입력 박스에서 벗어날 때 유효성 검사
    otherInput.addEventListener('blur', function() {
        validateOtherInput(this);
    });

    // 입력 시 에러 상태 제거
    otherInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
        }
    });

    // Enter 키 처리
    otherInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.blur(); // 포커스 해제하여 유효성 검사 트리거
        }
    });
}

function validateOtherInput(input) {
    const otherRadio = document.getElementById('dietary-other');
    
    if (otherRadio && otherRadio.checked && input.value.trim() === '') {
        input.classList.add('error');
        return false;
    } else {
        input.classList.remove('error');
        return true;
    }
}

// 폼 제출 시 유효성 검사 함수 (필요시 사용)
function validateDietaryRequirement() {
    const otherRadio = document.getElementById('dietary-other');
    const otherInput = document.getElementById('dietaryOtherText');
    
    if (otherRadio && otherRadio.checked) {
        return validateOtherInput(otherInput);
    }
    
    return true;
}

// 전역 함수로 내보내기 (필요시)
window.validateDietaryRequirement = validateDietaryRequirement;