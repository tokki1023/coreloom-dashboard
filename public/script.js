// 헤더 스크롤 효과
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // 모바일 메뉴 토글
        function initMobileMenu() {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', function() {
                    if (mobileMenu.style.display === 'block') {
                        mobileMenu.style.display = 'none';
                    } else {
                        mobileMenu.style.display = 'block';
                    }
                });
                
                // 외부 클릭시 메뉴 닫기
                document.addEventListener('click', function(event) {
                    if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                        mobileMenu.style.display = 'none';
                    }
                });
            }
        }
        
        // 성공사례 동적 로딩 (선택사항 - AJAX 방식)
        function loadSuccessCases() {
            fetch('/homepage_success_api.php?action=get_html')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const casesGrid = document.querySelector('.cases-grid');
                        if (casesGrid) {
                            casesGrid.innerHTML = data.html;
                        }
                    }
                })
                .catch(error => {
                    console.error('성공사례 로딩 오류:', error);
                });
        }
        
        // 페이지 로드 완료 후 초기화
        document.addEventListener('DOMContentLoaded', function() {
            initMobileMenu();
            
            // 필요시 동적 로딩 (현재는 PHP에서 서버사이드 렌더링 사용)
            // loadSuccessCases();
        });