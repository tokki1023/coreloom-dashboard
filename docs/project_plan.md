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
