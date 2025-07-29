-- CoreLoom Dashboard Database Schema
-- Supabase (PostgreSQL) 테이블 생성 스크립트

-- 1. contacts 테이블 (고객 문의)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    phone VARCHAR(50),
    company VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- contacts 테이블 인덱스
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- 2. portfolios 테이블 (포트폴리오)
CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    client_name VARCHAR(255),
    project_date DATE,
    thumbnail_url TEXT,
    status VARCHAR(50) DEFAULT 'active',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- portfolios 테이블 인덱스
CREATE INDEX idx_portfolios_status ON portfolios(status);
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_portfolios_display_order ON portfolios(display_order);

-- 3. community_posts 테이블 (커뮤니티 게시글)
CREATE TABLE IF NOT EXISTS community_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author_id INTEGER,
    author_name VARCHAR(255),
    category VARCHAR(100),
    view_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- community_posts 테이블 인덱스
CREATE INDEX idx_community_posts_author ON community_posts(author_id);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_community_posts_status ON community_posts(status);

-- 4. system_logs 테이블 (시스템 로그)
CREATE TABLE IF NOT EXISTS system_logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    context JSONB,
    user_id INTEGER,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- system_logs 테이블 인덱스
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at DESC);

-- 5. 샘플 데이터 삽입 (선택사항)
-- 문의 샘플 데이터
INSERT INTO contacts (name, email, message, phone, company, status) VALUES
('김철수', 'chulsoo@example.com', 'AI 솔루션 도입 관련 문의드립니다.', '010-1234-5678', '테크컴퍼니', 'pending'),
('이영희', 'younghee@example.com', '포트폴리오 제작 의뢰 문의', '010-9876-5432', '디자인스튜디오', 'completed'),
('박민수', 'minsoo@example.com', '협업 제안 드립니다', '010-5555-6666', '스타트업A', 'in_progress');

-- 포트폴리오 샘플 데이터
INSERT INTO portfolios (title, description, category, client_name, project_date, status) VALUES
('AI 챗봇 솔루션', 'GPT 기반 고객 상담 챗봇 개발', 'AI/ML', '테크컴퍼니', '2024-12-01', 'active'),
('반응형 웹사이트', '모바일 최적화 기업 홈페이지 제작', '웹개발', '디자인스튜디오', '2024-11-15', 'active'),
('데이터 분석 대시보드', '실시간 비즈니스 인사이트 제공', '데이터분석', '스타트업A', '2024-10-20', 'active');

-- 커뮤니티 게시글 샘플 데이터
INSERT INTO community_posts (title, content, author_name, category) VALUES
('AI 기술의 미래와 CoreLoom의 비전', 'AI 기술이 우리의 일상을 어떻게 변화시킬까요?', 'CoreLoom Team', '공지사항'),
('효율적인 프로젝트 관리 팁', '작은 팀에서도 큰 성과를 내는 방법', '김개발', '팁&노하우'),
('최신 웹 개발 트렌드 2025', 'Next.js 14와 Supabase를 활용한 풀스택 개발', '이프론트', '기술공유');

-- 시스템 로그 샘플 데이터
INSERT INTO system_logs (level, message, context) VALUES
('info', '시스템 시작됨', '{"version": "1.0.0", "environment": "production"}'::jsonb),
('warning', '높은 API 사용량 감지', '{"api_calls": 1500, "threshold": 1000}'::jsonb),
('info', '데이터베이스 백업 완료', '{"backup_size": "125MB", "duration": "45s"}'::jsonb);

-- 6. Row Level Security (RLS) 정책 설정
-- 보안을 위해 RLS 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 정책 (anon 사용자도 읽기 가능)
CREATE POLICY "Allow public read access" ON contacts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON system_logs FOR SELECT USING (true);

-- 쓰기 권한은 인증된 사용자만 (추후 관리자 인증 시스템 구현 시 수정)
-- CREATE POLICY "Allow authenticated insert" ON contacts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
