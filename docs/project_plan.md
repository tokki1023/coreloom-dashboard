# CoreLoom 프로젝트 계획서

## 프로젝트 개요
- **프로젝트명**: CoreLoom 대시보드 시스템
- **배포 URL**: https://coreloom-89of0s5hz-tokki1023s-projects.vercel.app
- **데이터베이스**: Supabase (PostgreSQL)
- **호스팅**: Vercel

## 기술 스택
- **프론트엔드**: HTML, CSS, JavaScript
- **백엔드**: Node.js/TypeScript (API Routes)
- **데이터베이스**: Supabase
- **배포**: Vercel

## 작업 내역

### 2025-07-29
#### Dashboard 페이지 마이그레이션
- **작업 내용**: dashboard_main.html을 Supabase 기반으로 변환
- **주요 변경사항**:
  1. PHP 코드를 JavaScript로 변환
  2. Supabase 클라이언트 연동
  3. 환경 변수 설정 (.env)
  4. API 엔드포인트 구성

- **생성된 파일**:
  - `/public/dashboard_main.html` - 대시보드 메인 페이지
  - `/public/dashboard.js` - Supabase 연동 JavaScript
  - `/api/supabase-config.js` - 환경 변수 API 엔드포인트
  - `/.env` - 환경 변수 템플릿

- **필요한 테이블 구조**:
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

## 배포 준비사항

### Vercel 환경 변수 설정
1. Vercel 대시보드에서 프로젝트 설정으로 이동
2. Environment Variables 섹션에서 다음 추가:
   - `NEXT_PUBLIC_SUPABASE_URL` - Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon 키

### 접근 URL
- 대시보드: https://coreloom-89of0s5hz-tokki1023s-projects.vercel.app/dashboard_main.html

## 다음 작업 예정
- contacts.html 페이지 마이그레이션
- portfolio.html 페이지 마이그레이션  
- community.html 페이지 마이그레이션
- settings.html 페이지 마이그레이션

## 배포 상태
- **완료**: 대시보드 페이지 개발 및 Supabase 연동 완료
- **대기**: Vercel 환경 변수 설정 필요
- **참고**: Git 저장소 초기화 및 첫 커밋 완료

## 로컬 테스트 방법
1. VS Code나 다른 편집기에서 프로젝트 열기
2. Live Server 확장 프로그램으로 실행
3. `/public/dashboard_main.html` 접속
4. Supabase 환경 변수 설정 후 테스트

## 2단계 완료: 설정 가이드 및 도구 생성

### 생성된 문서 및 도구
1. **데이터베이스 설정**
   - `/docs/supabase_schema.sql` - 테이블 생성 SQL 스크립트
   - `/docs/supabase_setup_guide.md` - Supabase 상세 설정 가이드

2. **배포 가이드**
   - `/docs/vercel_deployment_guide.md` - Vercel 배포 상세 가이드
   - `/QUICKSTART.md` - 빠른 시작 체크리스트

3. **개발 도구**
   - `/dev-server.js` - 로컬 개발 서버 (Node.js)
   - `/package.json` - 프로젝트 의존성 정의

### 다음 단계
1. **Supabase 설정**
   - 가이드 따라 프로젝트 생성
   - SQL 스크립트 실행
   - API 키 복사

2. **환경 변수 설정**
   - `.env` 파일에 Supabase 정보 입력

3. **로컬 테스트**
   ```bash
   npm install
   npm run dev
   ```

4. **Vercel 배포**
   - GitHub 리포지토리 생성
   - Vercel에서 Import
   - 환경 변수 설정

## 3단계 진행중: GitHub 및 Vercel 배포

### 배포 준비 완료
1. **배포 스크립트**: `/deploy.sh` - GitHub 푸시 및 Vercel 배포 가이드
2. **Vercel 설정**: `/vercel.json` - Vercel 빌드 및 라우팅 설정
3. **Git 상태**: 모든 파일 커밋 완료

### GitHub 배포 방법
1. GitHub에 `coreloom-dashboard` 리포지토리 생성
2. `./deploy.sh` 스크립트 실행
3. GitHub 사용자명 입력

### Vercel 배포 방법
1. [Vercel.com](https://vercel.com) 로그인
2. 'New Project' → GitHub 리포지토리 연결
3. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 클릭

### 다음 작업
- contacts.html 페이지 마이그레이션
- portfolio.html 페이지 마이그레이션
- community.html 페이지 마이그레이션
- settings.html 페이지 마이그레이션
