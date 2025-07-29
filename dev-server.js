// 로컬 개발 서버
// Node.js로 실행: node dev-server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME 타입 설정
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 환경 변수 로드 (개발용)
require('dotenv').config();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // 기본 경로 처리
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // API 엔드포인트 처리
  if (pathname === '/api/supabase-config' && req.method === 'GET') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }));
    return;
  }

  // 정적 파일 서빙
  const filePath = path.join(PUBLIC_DIR, pathname);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
🚀 CoreLoom 개발 서버가 시작되었습니다!

📍 접속 URL:
   - 메인: http://localhost:${PORT}
   - 대시보드: http://localhost:${PORT}/dashboard_main.html

📌 환경 변수 상태:
   - SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 설정됨' : '❌ 미설정'}
   - SUPABASE_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 미설정'}

💡 종료하려면 Ctrl+C를 누르세요.
  `);
});
