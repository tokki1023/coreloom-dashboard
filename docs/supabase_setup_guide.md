# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

### 1.1 계정 생성 및 로그인
1. [https://supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장) 또는 이메일로 가입

### 1.2 새 프로젝트 생성
1. Dashboard에서 "New project" 클릭
2. 프로젝트 정보 입력:
   - **Organization**: 개인 또는 팀 선택
   - **Project name**: `coreloom-dashboard`
   - **Database Password**: 강력한 비밀번호 설정 (저장 필수!)
   - **Region**: Seoul (한국) 또는 가장 가까운 지역 선택
3. "Create new project" 클릭 (프로젝트 생성에 약 2분 소요)

## 2. 데이터베이스 테이블 생성

### 2.1 SQL Editor 접속
1. 왼쪽 메뉴에서 "SQL Editor" 클릭
2. "New query" 클릭

### 2.2 테이블 생성 스크립트 실행
1. `/docs/supabase_schema.sql` 파일의 내용 전체 복사
2. SQL Editor에 붙여넣기
3. "Run" 버튼 클릭 (또는 Ctrl/Cmd + Enter)
4. 성공 메시지 확인

### 2.3 테이블 확인
1. 왼쪽 메뉴에서 "Table Editor" 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - contacts (문의 관리)
   - portfolios (포트폴리오)
   - community_posts (커뮤니티 게시글)
   - system_logs (시스템 로그)

## 3. API 키 확인

### 3.1 프로젝트 설정 접속
1. 왼쪽 메뉴 하단의 "Settings" 클릭
2. "API" 섹션 선택

### 3.2 필요한 정보 복사
다음 두 가지 정보를 안전한 곳에 저장:
- **Project URL**: `https://xxxxxxxxxxxx.supabase.co`
- **anon public key**: `eyJhbGciOiJ...` (매우 긴 문자열)

⚠️ **중요**: 
- `anon` 키만 사용하세요 (클라이언트 사이드에서 안전)
- `service_role` 키는 절대 사용하지 마세요 (서버 전용)

## 4. 로컬 환경 설정

### 4.1 .env 파일 수정
```bash
cd /Users/bagsuyeon/ClaudeOutput
```

`.env` 파일을 열고 다음과 같이 수정:
```
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_public_key_붙여넣기
```

### 4.2 .env 파일 보안
- `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- 절대 Git에 커밋하지 마세요

## 5. CORS 설정 (선택사항)

로컬 개발 시 CORS 오류가 발생하면:

1. Supabase Dashboard > Settings > API
2. "CORS Allowed Origins" 섹션
3. 다음 URL 추가:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - `http://127.0.0.1:5500`
   - `https://coreloom-89of0s5hz-tokki1023s-projects.vercel.app`

## 6. 테스트

### 6.1 로컬 테스트
1. VS Code에서 프로젝트 열기
2. Live Server 확장 프로그램 설치
3. `dashboard_main.html` 우클릭 > "Open with Live Server"
4. 브라우저 개발자 도구(F12) > Console 확인

### 6.2 확인 사항
- 통계 카드에 숫자가 표시되는지 확인
- 최근 문의 섹션에 샘플 데이터가 표시되는지 확인
- 콘솔에 오류가 없는지 확인

## 문제 해결

### "Failed to fetch Supabase config" 오류
- API 엔드포인트가 아직 배포되지 않았을 수 있습니다
- 로컬에서는 환경 변수를 직접 설정해야 할 수 있습니다

### CORS 오류
- Supabase Dashboard에서 CORS 설정 확인
- 로컬 서버 URL이 허용 목록에 있는지 확인

### 테이블이 비어있음
- SQL 스크립트의 샘플 데이터 부분도 실행했는지 확인
- Table Editor에서 직접 데이터 추가 가능

## 다음 단계
- Vercel 환경 변수 설정
- Git 리포지토리 연결 및 배포
