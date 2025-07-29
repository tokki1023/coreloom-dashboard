# 🚀 CoreLoom Dashboard 빠른 시작 가이드

## 📋 전체 설정 체크리스트

### ✅ 1단계: Supabase 설정
- [ ] Supabase 계정 생성
- [ ] 새 프로젝트 생성 (이름: coreloom-dashboard)
- [ ] SQL Editor에서 `/docs/supabase_schema.sql` 실행
- [ ] API 설정에서 URL과 anon key 복사

### ✅ 2단계: 환경 변수 설정
- [ ] `.env` 파일 열기
- [ ] NEXT_PUBLIC_SUPABASE_URL 입력
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY 입력
- [ ] 파일 저장

### ✅ 3단계: 로컬 테스트
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000/dashboard_main.html 접속

### ✅ 4단계: Git 업로드
```bash
# Git 설정 (처음인 경우)
git config user.name "Your Name"
git config user.email "your@email.com"

# GitHub 리포지토리 연결
git remote add origin https://github.com/yourusername/coreloom-dashboard.git

# 코드 푸시
git add .
git commit -m "Initial dashboard setup"
git push -u origin main
```

### ✅ 5단계: Vercel 배포
- [ ] Vercel.com 로그인
- [ ] Import Git Repository
- [ ] 환경 변수 2개 추가
- [ ] Deploy 클릭

## 🔧 문제 해결

### Q: npm: command not found
A: Node.js를 먼저 설치하세요: https://nodejs.org

### Q: 대시보드에 데이터가 안 보여요
A: 브라우저 콘솔(F12)에서 오류 확인
- 환경 변수가 제대로 설정되었는지 확인
- Supabase 테이블이 생성되었는지 확인

### Q: CORS 오류가 발생해요
A: Supabase Dashboard > Settings > API > CORS에서 http://localhost:3000 추가

## 📞 도움이 필요하면?
- 문서 확인: `/docs` 폴더
- 상세 가이드:
  - Supabase 설정: `/docs/supabase_setup_guide.md`
  - Vercel 배포: `/docs/vercel_deployment_guide.md`

## 🎉 완료!
모든 설정이 완료되면 대시보드에서:
- 통계 카드 4개가 표시됩니다
- 최근 문의 내역이 보입니다
- 빠른 액션 버튼이 작동합니다

Happy Coding! 🚀
