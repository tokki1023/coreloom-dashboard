# CoreLoom Dashboard

CoreLoom 관리자 대시보드 시스템 - Supabase와 Vercel을 활용한 정적 웹 애플리케이션

## 🚀 주요 기능

- **대시보드**: 전체 시스템 현황을 한눈에 확인
- **연락처 관리**: 고객 문의사항 관리 및 상태 추적
- **포트폴리오 관리**: 프로젝트 포트폴리오 CRUD 기능
- **커뮤니티 관리**: 게시글 및 커뮤니티 활동 모니터링
- **시스템 설정**: 일반 설정 및 시스템 로그 관리

## 🛠 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Authentication**: Supabase Auth (예정)

## 📦 설치 및 실행

### 1. 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/coreloom-dashboard.git
cd coreloom-dashboard

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 `/docs/supabase_schema.sql` 실행
3. 프로젝트 URL과 anon key를 환경 변수에 설정

## 🌐 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. GitHub 리포지토리 연결
3. 환경 변수 설정
4. Deploy 클릭

## 📁 프로젝트 구조

```
coreloom-dashboard/
├── public/                # 정적 파일
│   ├── dashboard_main.html
│   ├── contacts.html
│   ├── portfolio.html
│   ├── community.html
│   ├── settings.html
│   └── *.js              # 각 페이지별 JavaScript
├── api/                  # API 엔드포인트
│   └── supabase-config.js
├── docs/                 # 문서
│   ├── project_plan.md
│   ├── supabase_schema.sql
│   └── *.md
└── package.json
```

## 📚 문서

- [프로젝트 계획서](docs/project_plan.md)
- [Supabase 설정 가이드](docs/supabase_setup_guide.md)
- [Vercel 배포 가이드](docs/vercel_deployment_guide.md)
- [빠른 시작 가이드](QUICKSTART.md)

## 🤝 기여

기여를 환영합니다! 다음 단계를 따라주세요:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙏 감사의 말

- Supabase 팀의 훌륭한 오픈소스 데이터베이스 플랫폼
- Vercel의 빠르고 간편한 배포 서비스
