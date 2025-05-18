document.addEventListener('DOMContentLoaded', function() {
  // Quill 에디터 초기화를 위한 기본 도구 모음 옵션
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // 텍스트 서식
    ['blockquote', 'code-block'],                     // 블록 서식
    [{ 'header': 1 }, { 'header': 2 }],               // 헤더 크기
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 목록
    [{ 'script': 'sub'}, { 'script': 'super' }],      // 아래/위 첨자
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // 들여쓰기
    [{ 'direction': 'rtl' }],                         // 텍스트 방향
    [{ 'size': ['small', false, 'large', 'huge'] }],  // 글자 크기
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // 헤더 수준
    [{ 'color': [] }, { 'background': [] }],          // 글자색, 배경색
    [{ 'font': [] }],                                 // 글꼴
    [{ 'align': [] }],                                // 정렬
    ['clean']                                         // 서식 지우기
  ];

  // Paper Title 에디터 초기화
  const paperTitleEditor = new Quill('#paperTitleEditor', {
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Please insert Paper Title',
    theme: 'snow'
  });

  // Summary 에디터 초기화
  const summaryEditor = new Quill('#summaryEditor', {
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Please insert Summary',
    theme: 'snow'
  });

  // 워드 카운트 및 글자 수 카운트 함수
  function updateWordCount(editor, countElement) {
    if (!editor || !countElement) return;
    
    const text = editor.getText().trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const charCount = text.length;
    
    countElement.textContent = `Words: ${wordCount}  Characters: ${charCount}`;
    
    // Summary 에디터의 경우 150단어 제한 체크
    if (editor === summaryEditor && wordCount > 150) {
      countElement.classList.add('word-count-exceeded');
    } else {
      countElement.classList.remove('word-count-exceeded');
    }
  }

  // Paper Title 워드 카운트 설정
  const paperTitleCountElement = document.querySelector('#paperTitleEditor').closest('.form-group').querySelector('.word-count');
  paperTitleEditor.on('text-change', function() {
    updateWordCount(paperTitleEditor, paperTitleCountElement);
  });

  // Summary 워드 카운트 설정
  const summaryCountElement = document.querySelector('#summaryEditor').closest('.form-group').querySelector('.word-count');
  summaryEditor.on('text-change', function() {
    updateWordCount(summaryEditor, summaryCountElement);
  });

  // 초기 워드 카운트 설정
  updateWordCount(paperTitleEditor, paperTitleCountElement);
  updateWordCount(summaryEditor, summaryCountElement);

  // 파일 업로드 처리
  const browseBtn = document.querySelector('.browse-btn');
  const fileInput = document.getElementById('paperFile');
  const fileDisplayInput = document.querySelector('.file-upload-input');
  
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', function() {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        fileDisplayInput.value = this.files[0].name;
      }
    });
  }
  
  // 폼 제출 시 에디터 내용 가져오기 (필요한 경우)
  document.querySelector('form').addEventListener('submit', function(e) {
    // 이 예제에서는 기본 제출을 방지합니다
    e.preventDefault();
    
    // Hidden 필드에 에디터 내용 저장 또는 API로 전송
    const paperTitleContent = paperTitleEditor.root.innerHTML;
    const summaryContent = summaryEditor.root.innerHTML;
    
    console.log('Paper Title:', paperTitleContent);
    console.log('Summary:', summaryContent);
    
    // 여기에 폼 제출 로직 추가
  });
});