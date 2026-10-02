# 대입 자료실

경기도교육청 진로진학 자료집을 계열별로 정리한 정적 사이트입니다. GitHub Pages로 그대로 올릴 수 있습니다.

## 폴더 구조

```
index.html              허브(첫 화면). 계열 카드 목록
assets/tokens.css       색·간격·글꼴 값(디자인 토큰). 색을 바꾸려면 여기만 고치면 됨
assets/style.css        모든 페이지가 같이 쓰는 스타일(맑은 고딕 계열)
assets/nav.js           왼쪽 메뉴(SITE 목록) — 계열·페이지 추가는 여기서
media/                  미디어·영상 계열
  index.html            개요(숫자 요약 + 핵심 정리 + 세부 페이지 카드)
  schedule.html         2027 면접 일정
  special.html          특성화고졸업자 특별전형
  cuts.html             대학 발표 입결(2026 학종)
  questions.html        질문 유형 분포
  universities.html     대학별 면접 방식
  reviews.html          후기 전체(필터·검색)
  prep.html             준비법 + 공식 자료
  media.js              공통 상수, 출처 문구
  js/*.js               페이지별 표·그래프 그리는 코드
  data/reviews.js       면접후기 196건 (const D)
  data/2027.js          2027 일정·입결·특성화고·대학 메모 (SCHED, CUTS, SPEC, NOTES, NOTES27)
design/                 디자인 시스템 문서: 규칙(README), 전체 미리보기(index.html), 컴포넌트별 예시
.nojekyll               GitHub Pages가 파일을 가공하지 않도록
```

## 자주 하는 작업

- **강조 표시**: 본문에서 `<b>…</b>`는 형광펜 강조, `<b class="warn">…</b>`는 주의(주황색)입니다.
- **숫자·일정 고치기**: `media/data/2027.js`에서 해당 줄만 고치면 됩니다. 각 배열 위에 열 순서가 주석으로 적혀 있습니다.
- **세부 페이지 추가**: `media/` 안에 새 HTML을 만들고 `assets/nav.js`의 `SITE`에 한 줄 추가하면 모든 페이지 왼쪽 메뉴에 나타납니다. 새 페이지는 기존 페이지(예: `cuts.html`)를 복사해 본문만 바꾸면 메뉴 틀이 그대로 따라옵니다. 개요 페이지(`media/index.html`)의 카드도 하나 추가하세요.
- **새 계열 추가**: `media/` 폴더를 통째로 복사해 이름을 바꾸고(예: `it/`), 데이터와 문구를 바꾼 뒤 허브 `index.html`의 카드 틀(주석)을 채우고, `assets/nav.js`의 `SITE`에서 `soon:true` 항목을 `dir`·`pages`로 바꿉니다.
- **링크로 필터 공유**: `media/reviews.html?u=건국대학교(서울)` · `?c=시사·AI·미디어 이슈 견해` · `?r=불합` · `?q=딥페이크` 처럼 주소에 붙이면 그 조건으로 열립니다.

## GitHub Pages 올리기

1. 새 저장소를 만들고 이 폴더의 파일을 모두 올립니다(`.nojekyll` 포함).
2. 저장소 Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`.
3. 1~2분 뒤 `https://<계정>.github.io/<저장소>/` 로 열립니다.

## 공개 범위 주의

GitHub Pages 사이트는 **저장소를 비공개로 해도 주소를 아는 누구나 볼 수 있습니다**(접근 제한은 GitHub Enterprise Cloud 조직에서만 가능). 원 자료집은 학교 계정 전용이므로, 올리기 전에 공개해도 되는 범위인지 확인하세요.
