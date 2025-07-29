// Supabase 설정
let supabaseUrl = '';
let supabaseKey = '';
let supabase = null;

// 환경 변수 로드 및 Supabase 초기화
async function initSupabase() {
    try {
        const response = await fetch('/api/supabase-config');
        const config = await response.json();
        
        supabaseUrl = config.url;
        supabaseKey = config.anonKey;
        
        if (window.supabase) {
            supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
            console.log('Supabase 초기화 성공');
            loadPortfolios();
        }
    } catch (error) {
        console.error('Supabase 초기화 실패:', error);
        alert('데이터베이스 연결에 실패했습니다.');
    }
}

// 포트폴리오 목록 불러오기
async function loadPortfolios() {
    if (!supabase) {
        console.error('Supabase가 초기화되지 않았습니다.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        displayPortfolios(data);
    } catch (error) {
        console.error('포트폴리오 불러오기 실패:', error);
        document.getElementById('portfolioGrid').innerHTML = 
            '<p style="text-align: center; color: red;">데이터를 불러오는데 실패했습니다.</p>';
    }
}

// 포트폴리오 그리드 표시
function displayPortfolios(portfolios) {
    const grid = document.getElementById('portfolioGrid');
    
    if (!portfolios || portfolios.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">등록된 포트폴리오가 없습니다.</p>';
        return;
    }

    grid.innerHTML = portfolios.map(portfolio => `
        <div class="portfolio-card">
            <div class="portfolio-image">
                ${portfolio.image_url 
                    ? `<img src="${escapeHtml(portfolio.image_url)}" alt="${escapeHtml(portfolio.title)}" style="width: 100%; height: 100%; object-fit: cover;">` 
                    : '이미지 없음'}
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${escapeHtml(portfolio.title)}</h3>
                <p class="portfolio-description">${escapeHtml(truncateText(portfolio.description, 100))}</p>
                ${portfolio.category ? `<p style="font-size: 12px; color: #999;">카테고리: ${escapeHtml(portfolio.category)}</p>` : ''}
                <div class="portfolio-actions">
                    ${portfolio.project_url ? `<a href="${escapeHtml(portfolio.project_url)}" target="_blank" class="btn-view">보기</a>` : ''}
                    <button class="btn-update" onclick="editPortfolio(${portfolio.id})">수정</button>
                    <button class="btn-delete" onclick="deletePortfolio(${portfolio.id})">삭제</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 헬퍼 함수들
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
}

// 모달 관련 함수
function showAddModal() {
    document.getElementById('modalTitle').textContent = '포트폴리오 추가';
    document.getElementById('portfolioForm').reset();
    document.getElementById('portfolioId').value = '';
    document.getElementById('portfolioModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 포트폴리오 수정
async function editPortfolio(id) {
    if (!supabase) return;

    try {
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        document.getElementById('modalTitle').textContent = '포트폴리오 수정';
        document.getElementById('portfolioId').value = data.id;
        document.getElementById('title').value = data.title || '';
        document.getElementById('description').value = data.description || '';
        document.getElementById('image_url').value = data.image_url || '';
        document.getElementById('project_url').value = data.project_url || '';
        document.getElementById('category').value = data.category || '';
        document.getElementById('status').value = data.status || 'active';
        
        document.getElementById('portfolioModal').style.display = 'block';
    } catch (error) {
        console.error('포트폴리오 조회 실패:', error);
        alert('포트폴리오 정보를 불러오는데 실패했습니다.');
    }
}

// 포트폴리오 저장 (추가/수정)
async function savePortfolio(e) {
    e.preventDefault();
    
    if (!supabase) return;

    const id = document.getElementById('portfolioId').value;
    const portfolioData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        image_url: document.getElementById('image_url').value || null,
        project_url: document.getElementById('project_url').value || null,
        category: document.getElementById('category').value || null,
        status: document.getElementById('status').value
    };

    try {
        let error;
        
        if (id) {
            // 수정
            ({ error } = await supabase
                .from('portfolios')
                .update(portfolioData)
                .eq('id', id));
        } else {
            // 추가
            ({ error } = await supabase
                .from('portfolios')
                .insert([portfolioData]));
        }

        if (error) throw error;

        alert(id ? '포트폴리오가 수정되었습니다.' : '포트폴리오가 추가되었습니다.');
        closeModal('portfolioModal');
        loadPortfolios();
    } catch (error) {
        console.error('저장 실패:', error);
        alert('저장에 실패했습니다.');
    }
}

// 포트폴리오 삭제
async function deletePortfolio(id) {
    if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) return;
    
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('portfolios')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert('포트폴리오가 삭제되었습니다.');
        loadPortfolios();
    } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Supabase 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = initSupabase;
    document.head.appendChild(script);

    // 이벤트 리스너 설정
    document.getElementById('portfolioForm').addEventListener('submit', savePortfolio);

    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };
});