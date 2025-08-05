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

## 4단계 완료: 모든 페이지 마이그레이션 완료 (2025-07-29)

### 완료된 페이지
1. **contacts.html** - 연락처/문의사항 관리
   - 문의사항 목록 표시
   - 상태 업데이트 기능
   - 상세보기 및 삭제 기능
   - 실시간 검색 기능

2. **portfolio.html** - 포트폴리오 관리
   - 포트폴리오 그리드 레이아웃
   - 추가/수정/삭제 기능
   - 이미지 URL 지원
   - 카테고리 및 상태 관리

3. **community.html** - 커뮤니티 게시글 관리
   - 게시글 목록 및 통계
   - 상세보기 기능
   - 삭제 기능
   - 실시간 검색 기능

4. **settings.html** - 시스템 설정
   - 데이터베이스 연결 상태 확인
   - 일반 설정 관리
   - 시스템 로그 표시
   - 로그 관리 기능

### 생성된 파일
- `/public/contacts.html`, `/public/contacts.js`
- `/public/portfolio.html`, `/public/portfolio.js`
- `/public/community.html`, `/public/community.js`
- `/public/settings.html`, `/public/settings.js`

### 배포 준비 완료
- 모든 PHP 코드가 JavaScript로 변환됨
- Supabase 연동 완료
- 정적 호스팅 준비 완료

### 다음 단계
1. GitHub에 푸시
2. Vercel 배포 확인
3. Supabase 테이블 생성 (SQL 스크립트 실행)
4. 실제 데이터 테스트

## 5단계 진행중: 자동 배포 설정 (2025-08-05)

### 로그인 정보 설정
- **Vercel**: soo1023yeon@gmail.com / tndus3869@@
- **GitHub**: soo1023yeon@gmail.com / tndus3869@@

### 자동 배포 흐름
1. **GitHub 저장소**: coreloom-dashboard (이미 존재)
2. **Git Remote 설정**: 완료
3. **코드 푸시**: 진행중
4. **Vercel 연동**: 예정

### GitHub 연동 상태
- 저장소 생성: ✅ 완료 (기존 저장소 사용)
- Remote 설정: ✅ 완료
- 푸시 준비: ⚠️  인증 설정 필요
- 자동 배포: Vercel GitHub 연동 설정 후 가능

### Git 인증 문제 해결 방법

**방법 1: 터미널에서 수동 푸시**
```bash
cd /Users/bagsuyeon/ClaudeOutput
git remote set-url origin https://github.com/soo1023yeon/coreloom-dashboard.git
git push -u origin master
```
- Username: soo1023yeon
- Password: GitHub Personal Access Token 입력

**방법 2: GitHub Desktop 사용**
1. GitHub Desktop 설치
2. 저장소 Clone
3. 파일 동기화 후 Push

**방법 3: SSH 키 설정**
```bash
ssh-keygen -t rsa -b 4096 -C "soo1023yeon@gmail.com"
cat ~/.ssh/id_rsa.pub
```
- 출력된 키를 GitHub Settings > SSH Keys에 추가

### Vercel 자동 배포 설정 방법
1. Vercel 대시보드 접속
2. GitHub 저장소 연결
3. 환경 변수 설정:
   - SUPABASE_URL: https://vzpyfgverbdupwkbbtjj.supabase.co
   - SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
4. 자동 배포 완료 → GitHub push시 자동 재배포

**결과**: GitHub에 푸시할 때마다 자동으로 Vercel에 재배포됩니다!

## 6단계 완료: 메인페이지 현대화 (2025-08-05)

### 메인페이지 Supabase 마이그레이션 완료
1. **PHP → JavaScript 변환**: 완전한 정적 호스팅 지원
2. **Supabase 연동**: 포트폴리오 데이터 동적 로딩
3. **현대적 UI/UX**: 
   - 반응형 디자인 강화
   - 스크롤 애니메이션 추가
   - 로딩 상태 표시
   - 에러 처리 개선

### 새로 추가된 섹션
- **Hero Section**: 매력적인 첫인상과 CTA 버튼들
- **Stats Section**: 실시간 통계 (포트폴리오 개수 등)
- **Features Section**: CoreLoom 핵심 특징 소개
- **Footer**: 완전한 네비게이션과 링크들

### 생성/수정된 파일
- `/public/index.html` - 완전히 새로운 메인페이지
- `/public/script.js` - Supabase 기반 JavaScript
- `/public/style.css` - 새 섹션들을 위한 스타일 추가
- `/public/index_old.html` - 백업된 기존 PHP 버전

### 기술적 개선사항
- **동적 데이터 로딩**: 포트폴리오 데이터를 Supabase에서 실시간 로드
- **통계 자동 업데이트**: DB 레코드 수를 기반으로 통계 표시
- **스크롤 기반 애니메이션**: Intersection Observer 활용
- **에러 핸들링**: 네트워크 오류 시 기본 데이터 표시

### 페이지 구성
1. **Header**: 로고, 네비게이션, 모바일 메뉴
2. **Hero**: 메인 메시지와 CTA 버튼들
3. **Success Cases**: Supabase에서 로드되는 성공사례
4. **Stats**: 실시간 통계 (포트폴리오 수, 만족도 등)
5. **Features**: CoreLoom의 핵심 특징 3가지
6. **CTA**: 행동 유도 섹션
7. **Footer**: 링크 및 회사 정보

### 메인페이지 테스트 방법
1. **로컬 테스트**: `npm run dev` 후 http://localhost:3000
2. **배포 테스트**: https://coreloom-89of0s5hz-tokki1023s-projects.vercel.app
3. **기능 확인**:
   - 모바일 메뉴 동작
   - Supabase 데이터 로딩 (포트폴리오)
   - 버튼 링크 동작
   - 반응형 디자인
   - 스크롤 애니메이션

### 다음 단계
1. **GitHub Desktop으로 푸시**: 메인페이지 업데이트 배포
2. **Supabase 데이터 추가**: 실제 포트폴리오 데이터 입력
3. **테스트 및 검증**: 모든 기능 동작 확인
4. **추가 페이지 연동**: 다른 페이지들과의 네비게이션 테스트
