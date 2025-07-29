// Supabase 클라이언트 초기화
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase 클라이언트 변수
let supabase = null;

// Supabase 설정 가져오기
async function initSupabase() {
    try {
        const response = await fetch('/api/supabase-config');
        if (!response.ok) {
            throw new Error('Failed to fetch Supabase config');
        }
        
        const config = await response.json();
        supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
        return true;
    } catch (error) {
        console.error('Supabase 초기화 오류:', error);
        // 개발 환경용 폴백 (실제 배포시 제거)
        console.warn('API 설정을 가져올 수 없습니다. 환경 변수를 확인하세요.');
        return false;
    }
}

// DOM 요소들
const statsGrid = document.getElementById('statsGrid');
const recentContacts = document.getElementById('recentContacts');
const contactsActionStatus = document.getElementById('contactsActionStatus');
const portfolioActionStatus = document.getElementById('portfolioActionStatus');
const communityActionStatus = document.getElementById('communityActionStatus');

// 통계 데이터 로드
async function loadStatistics() {
    try {
        // 문의 통계
        const { data: contacts, error: contactsError } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true });
        
        // 포트폴리오 통계
        const { data: portfolios, error: portfoliosError } = await supabase
            .from('portfolios')
            .select('*', { count: 'exact', head: true });
        
        // 커뮤니티 통계  
        const { data: posts, error: postsError } = await supabase
            .from('community_posts')
            .select('*', { count: 'exact', head: true });
        
        // 시스템 로그 통계
        const { data: logs, error: logsError } = await supabase
            .from('system_logs')
            .select('*', { count: 'exact', head: true });

        // 통계 카드 HTML 생성
        const statsHTML = `
            <!-- 문의 통계 -->
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon contacts">
                        <i class="fas fa-envelope"></i>
                    </div>
                </div>
                <div class="stat-number">${contacts?.count || 0}</div>
                <div class="stat-label">전체 문의</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>새 문의 대기중</span>
                </div>
            </div>

            <!-- 포트폴리오 통계 -->
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon portfolio">
                        <i class="fas fa-briefcase"></i>
                    </div>
                </div>
                <div class="stat-number">${portfolios?.count || 0}</div>
                <div class="stat-label">포트폴리오 등록</div>
                <div class="stat-change neutral">
                    <i class="fas fa-circle"></i>
                    <span>활성 프로젝트</span>
                </div>
            </div>

            <!-- 커뮤니티 통계 -->
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon community">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-number">${posts?.count || 0}</div>
                <div class="stat-label">커뮤니티 게시글</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i>
                    <span>활발한 토론 중</span>
                </div>
            </div>

            <!-- 시스템 통계 -->
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon system">
                        <i class="fas fa-server"></i>
                    </div>
                </div>
                <div class="stat-number">${logs?.count || 0}</div>
                <div class="stat-label">시스템 로그</div>
                <div class="stat-change positive">
                    <i class="fas fa-check-circle"></i>
                    <span>시스템 정상</span>
                </div>
            </div>
        `;

        statsGrid.innerHTML = statsHTML;

    } catch (error) {
        console.error('통계 로드 오류:', error);
        statsGrid.innerHTML = '<div class="error">통계를 불러오는 중 오류가 발생했습니다.</div>';
    }
}

// 최근 문의 로드
async function loadRecentContacts() {
    try {
        const { data: recentContactsData, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;

        if (recentContactsData && recentContactsData.length > 0) {
            let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
            
            recentContactsData.forEach((contact, index) => {
                const date = new Date(contact.created_at).toLocaleDateString('ko-KR');
                html += `
                    <div style="padding: 1rem; background: var(--gray-50); border-radius: 8px; border-left: 4px solid var(--info-color);">
                        <div style="font-weight: 600; color: var(--gray-800); margin-bottom: 0.5rem;">
                            ${contact.name || '익명'} <span style="font-size: 0.85rem; color: var(--gray-500); font-weight: normal;">(${contact.email || '이메일 없음'})</span>
                        </div>
                        <div style="color: var(--gray-600); font-size: 0.9rem; margin-bottom: 0.5rem;">
                            ${contact.message ? contact.message.substring(0, 100) + '...' : '내용 없음'}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--gray-500);">
                            <i class="fas fa-clock"></i> ${date}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            recentContacts.innerHTML = html;
        } else {
            recentContacts.innerHTML = '<p style="text-align: center; color: var(--gray-500);">최근 문의가 없습니다.</p>';
        }

    } catch (error) {
        console.error('최근 문의 로드 오류:', error);
        recentContacts.innerHTML = '<div class="error">문의 내역을 불러오는 중 오류가 발생했습니다.</div>';
    }
}

// 빠른 액션 상태 업데이트
async function updateActionStatuses() {
    try {
        // 새 문의 수 확인
        const { data: newContacts, error: contactsError } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');
        
        if (contactsActionStatus) {
            contactsActionStatus.innerHTML = newContacts?.count > 0 
                ? `<i class="fas fa-exclamation-circle"></i> ${newContacts.count}개의 새 문의`
                : '<i class="fas fa-check-circle"></i> 모든 문의 처리됨';
        }

        // 포트폴리오 상태
        const { data: activePortfolios, error: portfoliosError } = await supabase
            .from('portfolios')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');
        
        if (portfolioActionStatus) {
            portfolioActionStatus.innerHTML = `<i class="fas fa-folder-open"></i> ${activePortfolios?.count || 0}개 프로젝트 활성`;
        }

        // 커뮤니티 상태
        const today = new Date().toISOString().split('T')[0];
        const { data: todayPosts, error: postsError } = await supabase
            .from('community_posts')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today);
        
        if (communityActionStatus) {
            communityActionStatus.innerHTML = `<i class="fas fa-comment-dots"></i> 오늘 ${todayPosts?.count || 0}개 게시글`;
        }

    } catch (error) {
        console.error('액션 상태 업데이트 오류:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    // Supabase 초기화
    const isInitialized = await initSupabase();
    
    if (!isInitialized) {
        statsGrid.innerHTML = '<div class="error">데이터베이스 연결에 실패했습니다. 환경 변수를 확인하세요.</div>';
        recentContacts.innerHTML = '<div class="error">데이터베이스 연결에 실패했습니다.</div>';
        return;
    }

    // 모든 데이터 로드
    await Promise.all([
        loadStatistics(),
        loadRecentContacts(),
        updateActionStatuses()
    ]);
});

// 30초마다 데이터 새로고침
setInterval(async () => {
    if (supabase) {
        await Promise.all([
            loadStatistics(),
            loadRecentContacts(),
            updateActionStatuses()
        ]);
    }
}, 30000);
