# CoreLoom Dashboard

CoreLoom 대시보드 시스템 - Supabase 기반 관리자 페이지

## 프로젝트 구조

```
/Users/bagsuyeon/ClaudeOutput/
├── api/                    # Vercel API 라우트
│   └── supabase-config.js  # Supabase 설정 API
├── public/                 # 정적 파일
│   ├── dashboard_main.html # 대시보드 메인 페이지
│   └── dashboard.js        # 대시보드 JavaScript
├── docs/                   # 문서
│   └── project_plan.md     # 프로젝트 계획서
└── .env                    # 환경 변수 (Git 제외)
```

## 설정 방법

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 설정에서 URL과 anon key 확인

### 2. 데이터베이스 테이블 생성
Supabase SQL Editor에서 다음 테이블 생성:

```sql
-- contacts 테이블
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- portfolios 테이블  
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- community_posts 테이블
CREATE TABLE community_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author_id INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- system_logs 테이블
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(50),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. 환경 변수 설정

#### 로컬 개발
`.env` 파일에 다음 내용 추가:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Vercel 배포
1. Vercel 대시보드 > 프로젝트 설정 > Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 페이지 목록

- `/dashboard_main.html` - 메인 대시보드
- `/contacts.html` - 문의 관리 (개발 예정)
- `/portfolio.html` - 포트폴리오 관리 (개발 예정)
- `/community.html` - 커뮤니티 관리 (개발 예정)
- `/settings.html` - 시스템 설정 (개발 예정)

## 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Icons**: Font Awesome

## 주요 기능

- 실시간 통계 대시보드
- 문의 관리 시스템
- 포트폴리오 CMS
- 커뮤니티 게시판 관리
- 시스템 로그 모니터링

## 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- `service_role` 키는 사용하지 마세요 (anon 키만 사용)
- 민감한 작업은 서버사이드 API를 통해 처리하세요
