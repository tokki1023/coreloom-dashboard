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
            
            // 데이터베이스 정보 표시
            document.getElementById('dbUrl').textContent = supabaseUrl;
            document.getElementById('dbStatus').innerHTML = '<span style="color: green;">✓ 연결됨</span>';
            
            // 로그 불러오기
            loadLogs();
            
            // 샘플 로그 추가
            addLog('info', '설정 페이지가 로드되었습니다.');
        }
    } catch (error) {
        console.error('Supabase 초기화 실패:', error);
        document.getElementById('dbUrl').textContent = '연결 실패';
        document.getElementById('dbStatus').innerHTML = '<span style="color: red;">✗ 연결 실패</span>';
    }
}

// 시스템 로그 불러오기
async function loadLogs() {
    if (!supabase) {
        console.error('Supabase가 초기화되지 않았습니다.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('system_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        displayLogs(data);
    } catch (error) {
        console.error('로그 불러오기 실패:', error);
        // 테이블이 없을 수도 있으므로 샘플 데이터 표시
        displaySampleLogs();
    }
}

// 로그 표시
function displayLogs(logs) {
    const tbody = document.getElementById('logsTableBody');
    
    if (!logs || logs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">로그가 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = logs.map(log => `
        <tr>
            <td>${formatDate(log.created_at)}</td>
            <td><span class="log-level ${log.level}">${log.level.toUpperCase()}</span></td>
            <td>${escapeHtml(log.message)}</td>
        </tr>
    `).join('');
}

// 샘플 로그 표시 (테이블이 없을 경우)
function displaySampleLogs() {
    const sampleLogs = [
        { created_at: new Date().toISOString(), level: 'info', message: '시스템이 시작되었습니다.' },
        { created_at: new Date(Date.now() - 3600000).toISOString(), level: 'warning', message: '데이터베이스 연결이 일시적으로 중단되었습니다.' },
        { created_at: new Date(Date.now() - 7200000).toISOString(), level: 'info', message: '새로운 사용자가 등록되었습니다.' },
        { created_at: new Date(Date.now() - 10800000).toISOString(), level: 'error', message: '이메일 전송에 실패했습니다.' }
    ];
    
    displayLogs(sampleLogs);
}

// 로그 추가
async function addLog(level, message) {
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('system_logs')
            .insert([{ level, message }]);

        if (error) throw error;
    } catch (error) {
        console.error('로그 추가 실패:', error);
    }
}

// 로그 지우기
async function clearLogs() {
    if (!confirm('정말로 모든 로그를 삭제하시겠습니까?')) return;
    
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('system_logs')
            .delete()
            .neq('id', 0); // 모든 로그 삭제

        if (error) throw error;

        alert('로그가 모두 삭제되었습니다.');
        loadLogs();
        addLog('info', '시스템 로그가 초기화되었습니다.');
    } catch (error) {
        console.error('로그 삭제 실패:', error);
        alert('로그 삭제에 실패했습니다.');
    }
}

// 설정 저장
function saveSettings(e) {
    e.preventDefault();
    
    const settings = {
        siteName: document.getElementById('siteName').value,
        itemsPerPage: document.getElementById('itemsPerPage').value,
        timezone: document.getElementById('timezone').value
    };
    
    // 로컬 스토리지에 저장 (실제로는 서버나 DB에 저장해야 함)
    localStorage.setItem('coreloom_settings', JSON.stringify(settings));
    
    alert('설정이 저장되었습니다.');
    addLog('info', '시스템 설정이 변경되었습니다.');
}

// 설정 불러오기
function loadSettings() {
    const savedSettings = localStorage.getItem('coreloom_settings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('siteName').value = settings.siteName || 'CoreLoom';
        document.getElementById('itemsPerPage').value = settings.itemsPerPage || '20';
        document.getElementById('timezone').value = settings.timezone || 'Asia/Seoul';
    }
}

// 헬퍼 함수들
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Supabase 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = initSupabase;
    document.head.appendChild(script);

    // 설정 불러오기
    loadSettings();

    // 이벤트 리스너 설정
    document.getElementById('settingsForm').addEventListener('submit', saveSettings);
});