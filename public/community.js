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
            loadPosts();
            loadStats();
        }
    } catch (error) {
        console.error('Supabase 초기화 실패:', error);
        alert('데이터베이스 연결에 실패했습니다.');
    }
}

// 게시글 목록 불러오기
async function loadPosts() {
    if (!supabase) {
        console.error('Supabase가 초기화되지 않았습니다.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('community_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        displayPosts(data);
    } catch (error) {
        console.error('게시글 불러오기 실패:', error);
        document.getElementById('postsList').innerHTML = 
            '<div style="padding: 40px; text-align: center; color: red;">데이터를 불러오는데 실패했습니다.</div>';
    }
}

// 통계 불러오기
async function loadStats() {
    if (!supabase) return;

    try {
        // 전체 게시글 수
        const { count: totalPosts } = await supabase
            .from('community_posts')
            .select('*', { count: 'exact', head: true });

        // 오늘의 게시글 수
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count: todayPosts } = await supabase
            .from('community_posts')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString());

        // 통계 업데이트
        document.getElementById('totalPosts').textContent = totalPosts || 0;
        document.getElementById('todayPosts').textContent = todayPosts || 0;
        
        // 댓글과 활성 사용자는 추가 테이블이 필요하므로 일단 0으로 표시
        document.getElementById('totalReplies').textContent = '0';
        document.getElementById('activeUsers').textContent = '0';
    } catch (error) {
        console.error('통계 불러오기 실패:', error);
    }
}

// 게시글 목록 표시
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = '<div style="padding: 40px; text-align: center;">등록된 게시글이 없습니다.</div>';
        return;
    }

    postsList.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-header">
                <div>
                    <h3 class="post-title">${escapeHtml(post.title)}</h3>
                    <div class="post-meta">
                        작성자: ${post.author_id ? `사용자 #${post.author_id}` : '익명'} | 
                        작성일: ${formatDate(post.created_at)}
                    </div>
                </div>
                <div class="post-actions">
                    <button class="btn-view" onclick="viewPost(${post.id})">상세보기</button>
                    <button class="btn-delete" onclick="deletePost(${post.id})">삭제</button>
                </div>
            </div>
            <div class="post-content">
                ${escapeHtml(truncateText(post.content, 200))}
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

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

// 게시글 상세보기
async function viewPost(id) {
    if (!supabase) return;

    try {
        const { data, error } = await supabase
            .from('community_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const content = `
            <h2>${escapeHtml(data.title)}</h2>
            <div style="color: #666; margin-bottom: 20px;">
                작성자: ${data.author_id ? `사용자 #${data.author_id}` : '익명'} | 
                작성일: ${formatDate(data.created_at)}
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; line-height: 1.6;">
                ${escapeHtml(data.content).replace(/\n/g, '<br>')}
            </div>
            
            <div class="replies-section">
                <h3>댓글</h3>
                <p style="color: #666;">댓글 기능은 준비 중입니다.</p>
            </div>
        `;

        document.getElementById('postModalContent').innerHTML = content;
        document.getElementById('postModal').style.display = 'block';
    } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
    }
}

// 게시글 삭제
async function deletePost(id) {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('community_posts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert('게시글이 삭제되었습니다.');
        loadPosts();
        loadStats();
    } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}

// 모달 닫기
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 검색 기능
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const posts = document.querySelectorAll('.post-item');
        
        posts.forEach(post => {
            const text = post.textContent.toLowerCase();
            post.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Supabase 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = initSupabase;
    document.head.appendChild(script);

    // 이벤트 리스너 설정
    setupSearch();

    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };
});