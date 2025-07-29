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
            loadContacts();
        }
    } catch (error) {
        console.error('Supabase 초기화 실패:', error);
        alert('데이터베이스 연결에 실패했습니다.');
    }
}

// 연락처 목록 불러오기
async function loadContacts() {
    if (!supabase) {
        console.error('Supabase가 초기화되지 않았습니다.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        displayContacts(data);
    } catch (error) {
        console.error('연락처 불러오기 실패:', error);
        document.getElementById('contactsTableBody').innerHTML = 
            '<tr><td colspan="7" style="text-align: center; color: red;">데이터를 불러오는데 실패했습니다.</td></tr>';
    }
}

// 연락처 테이블 표시
function displayContacts(contacts) {
    const tbody = document.getElementById('contactsTableBody');
    
    if (!contacts || contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">등록된 문의사항이 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.id}</td>
            <td>${escapeHtml(contact.name || '이름 없음')}</td>
            <td>${escapeHtml(contact.email || '이메일 없음')}</td>
            <td>${escapeHtml(truncateText(contact.message || '메시지 없음', 50))}</td>
            <td><span class="status-badge status-${contact.status || 'pending'}">${getStatusText(contact.status)}</span></td>
            <td>${formatDate(contact.created_at)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="viewContact(${contact.id})">보기</button>
                    <button class="btn-update" onclick="showUpdateModal(${contact.id}, '${contact.status}')">상태</button>
                    <button class="btn-delete" onclick="deleteContact(${contact.id})">삭제</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 헬퍼 함수들
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function getStatusText(status) {
    const statusMap = {
        'pending': '대기중',
        'in-progress': '진행중',
        'completed': '완료'
    };
    return statusMap[status] || '대기중';
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

// 연락처 상세보기
async function viewContact(id) {
    if (!supabase) return;

    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        const content = `
            <div style="margin: 20px 0;">
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>이름:</strong> ${escapeHtml(data.name || '이름 없음')}</p>
                <p><strong>이메일:</strong> ${escapeHtml(data.email || '이메일 없음')}</p>
                <p><strong>상태:</strong> <span class="status-badge status-${data.status}">${getStatusText(data.status)}</span></p>
                <p><strong>등록일:</strong> ${formatDate(data.created_at)}</p>
                <hr style="margin: 20px 0;">
                <p><strong>메시지:</strong></p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    ${escapeHtml(data.message || '메시지 없음')}
                </div>
            </div>
        `;

        document.getElementById('viewModalContent').innerHTML = content;
        document.getElementById('viewModal').style.display = 'block';
    } catch (error) {
        console.error('상세보기 실패:', error);
        alert('문의사항을 불러오는데 실패했습니다.');
    }
}

// 상태 업데이트 모달 표시
function showUpdateModal(id, currentStatus) {
    document.getElementById('updateContactId').value = id;
    document.getElementById('updateStatus').value = currentStatus || 'pending';
    document.getElementById('updateModal').style.display = 'block';
}

// 상태 업데이트
async function updateContactStatus(e) {
    e.preventDefault();
    
    if (!supabase) return;

    const id = document.getElementById('updateContactId').value;
    const status = document.getElementById('updateStatus').value;

    try {
        const { error } = await supabase
            .from('contacts')
            .update({ status })
            .eq('id', id);

        if (error) throw error;

        alert('상태가 업데이트되었습니다.');
        closeModal('updateModal');
        loadContacts();
    } catch (error) {
        console.error('상태 업데이트 실패:', error);
        alert('상태 업데이트에 실패했습니다.');
    }
}

// 연락처 삭제
async function deleteContact(id) {
    if (!confirm('정말로 이 문의사항을 삭제하시겠습니까?')) return;
    
    if (!supabase) return;

    try {
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert('문의사항이 삭제되었습니다.');
        loadContacts();
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
        const rows = document.querySelectorAll('#contactsTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
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
    document.getElementById('updateForm').addEventListener('submit', updateContactStatus);
    setupSearch();

    // 모달 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };
});
