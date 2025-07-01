# Gauss Wallet Demo

A demo site for testing the UI/UX of Gauss Wallet.

## 🚀 Live Demo

[https://[your-username].github.io/wallet-demo](https://[your-username].github.io/wallet-demo)

## 📱 주요 기능

### 1. **스플래시/온보딩 화면**
- 미니멀한 브랜딩
- Import/Create wallet 옵션

### 2. **메인 지갑 화면**
- **Account 드롭다운**: 계정 전환 및 관리
- **Network 드롭다운**: 네트워크 전환
- **자산 관리**: 토큰 잔액 표시
- **주요 액션**: 전송, 수신, 스왑, 구매

### 3. **설정 (하단 팝업)**
- 스와이프로 열기/닫기
- 일반, 보안, 고급 설정

### 4. **지갑 가져오기**
- Seed Phrase 가져오기
- Private Key 가져오기
- JSON 파일 가져오기

### 5. **지갑 생성**
- 12개 단어 시드 구문 생성
- 안전한 백업 프로세스

## 🛠 기술 스택

- Pure HTML/CSS/JavaScript
- Mobile-first responsive design
- GitHub Pages hosting

## 📂 프로젝트 구조

```
wallet-demo/
├── index.html          # 스플래시 화면
├── css/
│   └── style.css      # 공통 스타일
├── js/
│   └── app.js         # 공통 JavaScript
├── pages/
│   ├── main.html      # 메인 지갑 화면
│   ├── import.html    # 지갑 가져오기
│   └── create.html    # 지갑 생성
├── assets/
│   └── images/        # 이미지 리소스
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions 배포 설정
└── README.md          # 프로젝트 문서
```

## 🚀 로컬 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/[your-username]/wallet-demo.git
cd wallet-demo
```

2. 로컬 서버 실행 (Python 3)
```bash
python -m http.server 8000
```

3. 브라우저에서 접속
```
http://localhost:8000
```

## 📱 모바일 테스트

1. **Chrome DevTools**
   - F12 → Toggle device toolbar
   - Device: iPhone 12 Pro (360x800)

2. **실제 디바이스**
   - GitHub Pages URL을 모바일에서 직접 접속
   - 홈 화면에 추가하여 앱처럼 사용

## 🎨 디자인 가이드

### 색상
- Primary: `#000000` (Black)
- Secondary: `#FFFFFF` (White)
- Background: `#0B0B0D`
- Surface: `#1A1A1A`
- Border: `#333333`

### 폰트
- Font Family: JetBrains Mono
- Weights: 400, 500, 600, 700

### 브레이크포인트
- Mobile: 360px (기본)
- Tablet: 768px
- Desktop: 1024px

## 📝 추가 개발 계획

### Phase 1 (완료)
- [x] 스플래시 화면
- [x] 메인 지갑 화면
- [x] Account/Network 드롭다운
- [x] Settings 하단 팝업
- [x] 지갑 Import 플로우
- [x] 지갑 Create 플로우

### Phase 2
- [ ] 거래 전송 화면
- [ ] 거래 내역 화면
- [ ] QR 코드 스캔
- [ ] 주소록 관리

### Phase 3
- [ ] DApp 브라우저
- [ ] NFT 갤러리
- [ ] 스왑 기능
- [ ] 다국어 지원

## 🚀 GitHub Pages 배포

1. GitHub에 저장소 생성

2. 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[your-username]/wallet-demo.git
git push -u origin main
```

3. GitHub Pages 활성화
   - Settings → Pages
   - Source: GitHub Actions 선택

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.

## 🔗 관련 링크

- [Figma Design](https://www.figma.com/design/6QcdQXJQcIkQCCuzjgluX1/)
- [Okto Wallet Reference](https://okto.tech)

---

Made with ❤️ by Gauss Team