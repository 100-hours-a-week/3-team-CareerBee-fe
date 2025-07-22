# 🐝 CareerBee - 프론트엔드

IT 구직자들을 위한 커리어 시각화 서비스 **CareerBee**의 프론트엔드 레포지토리입니다.  
기업 정보, 채용 공고, CS 대회, 면접 질문 등을 시각화하여 구직자의 정보 탐색 피로도를 줄이고 동기를 부여합니다.

> **배포 주소:** [https://www.careerbee.co.kr](https://www.careerbee.co.kr)

---

## 🚀 주요 기능

- 📍 **지도 기반 기업 탐색**: 카카오맵을 이용한 위치 기반 기업 탐색
- 🏢 **기업 상세 페이지**: 채용 공고, 최신 이슈, 유저 관심도 등을 시각화
- 🧠 **면접 질문 생성 및 답변**: AI 기반 질문 추천 및 답변 저장
- 🥇 **CS 실시간 대회**: 매일 열리는 CS 문제 풀이 대회
- 📄 **이력서 생성**: AI 기반 질문 제공으로 이력서 생성

---

## 🛠 기술 스택

| 영역       | 기술                                           |
|------------|------------------------------------------------|
| 프레임워크 | Next.js15, TypeScript                    |
| 상태 관리 | Zustand, TanStack Query 5                      |
| 스타일링   | Tailwind CSS, shadcn/ui                       |
| 애니메이션 | Framer Motion                                  |
| 시각화     | D3.js                                       |
| 지도       | Kakao Map SDK                                  |
| 빌드 도구 | pnpm                                     |

---

## 📁 폴더 구조 (FSD 기반)

```
src/
├── app/                   # 라우터 및 엔트리포인트
├── pages/                 # 페이지 단위 UI
├── features/              # 기능 단위 UI + 비즈니스 로직
├── entities/              # 핵심 도메인 모델
├── shared/                # 공통 컴포넌트, 유틸, 타입 등
├── widgets/               # 여러 기능이 결합된 UI 위젯
└── styles/                # 글로벌 스타일
```

---

## ⚙️ 실행 방법

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 빌드 결과 프리뷰
pnpm preview

```
⸻

## 📝 커밋 컨벤션

태그	설명
Feat	새로운 기능 추가
Fix	버그 수정
Refact	리팩토링
Style	스타일 변경 (기능 X)
Docs	문서 변경
Test	테스트 코드 추가
Chore	환경설정, 빌드 등 잡일
Rename	파일/폴더명 변경
Remove	파일/코드 삭제
Design	UI 디자인 변경

예시:  feat: 지도에서 기업 핀 클릭 시 상세 페이지 이동 추가


⸻

## 👨‍💻 개발자

- emily.kim(김부경)


⸻

### 📌 기타 참고 사항

-	일부 기능은 개발 중이며, /to-be-continued로 리디렉션됩니다.
-	개발 서버와 운영 서버는 각각 develop, main 브랜치 기준으로 배포됩니다.

