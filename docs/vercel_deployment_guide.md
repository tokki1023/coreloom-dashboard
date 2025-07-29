# Vercel 배포 가이드

## 1. Vercel 계정 설정

### 1.1 Vercel 가입
1. [https://vercel.com](https://vercel.com) 접속
2. "Sign Up" 클릭
3. GitHub, GitLab, 또는 Bitbucket 계정으로 로그인 (권장)

### 1.2 Git 리포지토리 준비
현재 프로젝트를 GitHub에 푸시:

```bash
cd /Users/bagsuyeon/ClaudeOutput

# Git 사용자 정보 설정 (처음인 경우)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# GitHub에 새 리포지토리 생성 후
git remote add origin https://github.com/yourusername/coreloom-dashboard.git
git branch -M main
git push -u origin main
```

## 2. Vercel 프로젝트 연결

### 2.1 새 프로젝트 Import
1. Vercel Dashboard에서 "Add New..." > "Project" 클릭
2. "Import Git Repository" 선택
3. GitHub 계정 연결 및 권한 부여
4. `coreloom-dashboard` 리포지토리 선택

### 2.2 프로젝트 설정
Import 화면에서:
- **Project Name**: `coreloom-dashboard` (또는 원하는 이름)
- **Framework Preset**: `Other` 선택
- **Root Directory**: `.` (변경하지 않음)
- **Build Command**: 비워둠 (정적 사이트)
- **Output Directory**: `public`

## 3. 환경 변수 설정

### 3.1 Environment Variables 섹션
같은 Import 화면에서 "Environment Variables" 섹션 확장

### 3.2 변수 추가
다음 변수들을 추가:

1. **변수 1**:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `Supabase 프로젝트 URL`
   - Environment: Production, Preview, Development 모두 체크

2. **변수 2**:
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `Supabase anon 키`
   - Environment: Production, Preview, Development 모두 체크

### 3.3 배포
"Deploy" 버튼 클릭

## 4. 기존 프로젝트에 환경 변수 추가 (이미 배포된 경우)

### 4.1 프로젝트 설정 접속
1. Vercel Dashboard에서 프로젝트 선택
2. "Settings" 탭 클릭
3. 왼쪽 메뉴에서 "Environment Variables" 선택

### 4.2 변수 추가
1. "Add New" 클릭
2. 위와 동일한 변수들 추가
3. "Save" 클릭

### 4.3 재배포
환경 변수 추가 후 재배포 필요:
1. "Deployments" 탭으로 이동
2. 최신 배포 옆의 "..." 메뉴 클릭
3. "Redeploy" 선택
4. "Redeploy" 확인

## 5. 도메인 설정 (선택사항)

### 5.1 커스텀 도메인 추가
1. Settings > Domains
2. 도메인 입력 (예: `dashboard.coreloom.com`)
3. DNS 설정 안내 따르기

### 5.2 자동 생성 도메인
- Vercel은 자동으로 도메인 제공: `프로젝트명.vercel.app`
- 현재: `https://coreloom-89of0s5hz-tokki1023s-projects.vercel.app`

## 6. 배포 확인

### 6.1 배포 상태 확인
1. Vercel Dashboard에서 배포 상태 확인
2. "Ready" 상태가 되면 URL 클릭

### 6.2 페이지 테스트
1. `/dashboard_main.html` 접속
2. 통계 카드 로딩 확인
3. 브라우저 개발자 도구로 오류 확인

## 7. 문제 해결

### 404 오류
`vercel.json` 파일 확인:
```json
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/index.html"
    }
  ]
}
```

### 환경 변수 인식 안됨
1. 환경 변수 이름이 정확한지 확인
2. 재배포 했는지 확인
3. API 엔드포인트 경로 확인

### API 라우트 작동 안함
`/api` 폴더가 프로젝트 루트에 있는지 확인

## 8. 지속적 배포

### 8.1 자동 배포
- main/master 브랜치에 push하면 자동 배포
- Pull Request 생성 시 Preview 배포 생성

### 8.2 수동 배포
```bash
# 코드 변경 후
git add .
git commit -m "Update dashboard"
git push origin main
```

## 9. 모니터링

### 9.1 Analytics
- Vercel Dashboard > Analytics에서 트래픽 확인
- Web Vitals 성능 지표 모니터링

### 9.2 Functions 로그
- Vercel Dashboard > Functions 탭
- API 호출 로그 확인 가능

## 완료!
이제 CoreLoom 대시보드가 Vercel에 배포되었습니다.
접속 URL: `https://your-project.vercel.app/dashboard_main.html`
