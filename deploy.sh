#!/bin/bash

# GitHub 리포지토리 연결 및 푸시
echo "GitHub 사용자명을 입력하세요:"
read GITHUB_USERNAME

echo "GitHub 리포지토리를 연결하는 중..."
git remote add origin https://github.com/$GITHUB_USERNAME/coreloom-dashboard.git

echo "브랜치를 main으로 변경..."
git branch -M main

echo "코드를 GitHub에 푸시하는 중..."
git push -u origin main

echo "✅ GitHub 푸시 완료!"
echo ""
echo "이제 Vercel에서 배포를 진행하세요:"
echo "1. https://vercel.com 에 로그인"
echo "2. 'New Project' 클릭"
echo "3. GitHub 계정 연결 (아직 안했다면)"
echo "4. 'coreloom-dashboard' 리포지토리 선택"
echo "5. 다음 환경 변수 추가:"
echo "   - NEXT_PUBLIC_SUPABASE_URL = https://vzpyfgverbdupwkbbtjj.supabase.co"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cHlmZ3ZlcmJkdXB3a2JidGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzcyNTgsImV4cCI6MjA2ODI1MzI1OH0.jY7A5FZBZZ3z05RydX05nBYb6DtFHn3o91_WG4OzdS8"
echo "6. 'Deploy' 클릭"
