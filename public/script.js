// CoreLoom 메인페이지 JavaScript
// Supabase 설정
let supabase;

// 환경 변수 로드
async function loadConfig() {
    try {
        const response = await fetch('/api/supabase-config.js');
        const config = await response.json();
        
        supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
        console.log('Supabase 연결 성공');
        
        // 페이지 초기화
        initializePage();
    } catch (error) {
        console.error('Supabase 연결 실패:', error);
        showErrorMessage();
    }
}

// 페이지 초기화
function initializePage() {
    initMobileMenu();
    initScrollEffects();
    loadSuccessCases();
    loadStats();
    initAnimations();
}

// 헤더 스크롤 효과
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

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

// 성공사례 로드 (Supabase에서)
async function loadSuccessCases() {
    try {
        const { data: portfolios, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) throw error;

        renderSuccessCases(portfolios);
    } catch (error) {
        console.error('성공사례 로딩 오류:', error);
        renderDefaultCases();
    }
}

// 성공사례 렌더링
function renderSuccessCases(cases) {
    const casesGrid = document.getElementById('cases-grid');
    
    if (!cases || cases.length === 0) {
        renderDefaultCases();
        return;
    }
    
    const casesHTML = cases.map(caseItem => `
        <div class="case-card">
            <div class="case-company">${caseItem.category || '기업'}</div>
            <h3>${caseItem.title}</h3>
            <div class="case-stats">
                <div class="stat">
                    <div class="stat-number">15초</div>
                    <div class="stat-label">구축 시간</div>
                </div>
                <div class="stat">
                    <div class="stat-number">80%</div>
                    <div class="stat-label">비용 절감</div>
                </div>
                <div class="stat">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">만족도</div>
                </div>
            </div>
            <p>${caseItem.description || '성공적인 프로젝트 완료'}</p>
        </div>
    `).join('');
    
    casesGrid.innerHTML = casesHTML;
}

// 기본 성공사례 (데이터가 없을 때)
function renderDefaultCases() {
    const casesGrid = document.getElementById('cases-grid');
    const defaultCases = [
        {
            company: "테크 스타트업",
            title: "AI 기반 쇼핑몰 15초 구축",
            description: "CoreLoom 덕분에 개발 기간을 90% 단축하고 비용을 80% 절감했습니다."
        },
        {
            company: "중견 제조업체",
            title: "기업 홈페이지 완전 자동화",
            description: "복잡한 제품 카탈로그도 AI가 자동으로 정리해주어 놀라웠습니다."
        },
        {
            company: "교육 기관",
            title: "온라인 학습 플랫폼 구축",
            description: "학생들의 반응이 뜨겁습니다. 사용성이 정말 뛰어나요!"
        }
    ];
    
    const casesHTML = defaultCases.map(caseItem => `
        <div class="case-card">
            <div class="case-company">${caseItem.company}</div>
            <h3>${caseItem.title}</h3>
            <div class="case-stats">
                <div class="stat">
                    <div class="stat-number">15초</div>
                    <div class="stat-label">구축 시간</div>
                </div>
                <div class="stat">
                    <div class="stat-number">80%</div>
                    <div class="stat-label">비용 절감</div>
                </div>
                <div class="stat">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">만족도</div>
                </div>
            </div>
            <p>"${caseItem.description}"</p>
        </div>
    `).join('');
    
    casesGrid.innerHTML = casesHTML;
}

// 통계 로드
async function loadStats() {
    try {
        // 실제 통계 데이터 가져오기
        const [portfoliosCount, contactsCount] = await Promise.all([
            supabase.from('portfolios').select('id').eq('status', 'active'),
            supabase.from('contacts').select('id')
        ]);
        
        // 통계 업데이트
        const websitesElement = document.getElementById('websites-count');
        if (websitesElement && portfoliosCount.data) {
            const count = portfoliosCount.data.length;
            animateNumber(websitesElement, count > 0 ? `${count}+` : '500+');
        }
        
    } catch (error) {
        console.error('통계 로딩 오류:', error);
        // 기본값 유지
    }
}

// 숫자 애니메이션
function animateNumber(element, finalValue) {
    const finalNum = parseInt(finalValue.replace(/\D/g, ''));
    let current = 0;
    const increment = finalNum / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNum) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 50);
}

// 스크롤 애니메이션
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    document.querySelectorAll('.case-card, .feature-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// 에러 메시지 표시
function showErrorMessage() {
    const casesGrid = document.getElementById('cases-grid');
    if (casesGrid) {
        casesGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
                <button onclick="loadSuccessCases()" class="btn btn-primary">
                    <i class="fas fa-refresh"></i>
                    다시 시도
                </button>
            </div>
        `;
    }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});