# 대입 자료실

경기도교육청 진로진학 자료집을 계열별로 정리한 정적 사이트입니다. GitHub Pages로 그대로 올릴 수 있습니다.

## 폴더 구조

```
index.html              허브(첫 화면). 계열·전형 카드 목록
assets/style.css        모든 페이지가 같이 쓰는 스타일(맑은 고딕 계열)
assets/nav.js           왼쪽 메뉴(SITE 목록) — 계열·페이지 추가는 여기서
media/                  미디어·영상 · 학종·면접 (학생부종합 면접 중심)
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
silgi/                  영화·영상 · 실기 (영화과 실기 전형)
  index.html            개요(숫자 요약 + 핵심 정리 + 세부 페이지 카드 + 자료집 속 실기 후기 + 반영한 자료 목록)
  types.html            대학별 실기 유형(단계·시간·배점·유의사항·복기에서 나온 점)
  exams.html            기출·연습 문제(연습 문제 뽑기 + 타이머, 대학별 기출)
  reviews.html          합격 복기·자가진단(필터·검색, 같은 수험생 묶어 보기)
  method.html           분석·작문 방법(이미지·시나리오 분석, 이야기 구술, 작문, 비평)
  interview.html        면접 대비(질문 유형 집계, 면접지 체크리스트, 구술 개념)
  glossary.html         용어 사전(검색·분류)
  history.html          영화사(세계 사조, 한국영화사, 중국·홍콩·대만)
  silgi.js              공통 도우미, 질문 유형 규칙(QT), 출처 문구
  js/*.js               페이지별 코드
  data/schools.js       대학별 실기 유형 (SCH, SCH17)
  data/exams.js         기출 (EX) + 연습 문제 은행 (PRACTICE)
  data/boki.js          합격 복기 (BK) — 이름 삭제, 요약
  data/jindan.js        면접·실기 자가진단 (JG)
  data/terms.js         용어 사전 (TERMS)
.nojekyll               GitHub Pages가 파일을 가공하지 않도록
.gitignore              맥(.DS_Store)·윈도우(Thumbs.db) 숨김 파일이 올라가지 않도록
.gitattributes          맥·윈도우를 오가도 줄바꿈이 섞이지 않도록
```

## 자주 하는 작업

- **강조 표시**: 본문에서 `<b>…</b>`는 형광펜 강조, `<b class="warn">…</b>`는 주의(주황색)입니다.
- **고친 내용이 안 보일 때**: 브라우저가 예전 파일을 기억하고 있어서입니다. `assets/`·`media/`·`silgi/` 안의 css·js를 고쳤다면 모든 HTML에서 `?v=20261006f` 같은 숫자를 새 날짜로 바꿔 주세요(예: `?v=20261015`). 그러면 방문자 브라우저도 새 파일을 받습니다.
- **숫자·일정 고치기**: `media/data/2027.js`에서 해당 줄만 고치면 됩니다. 각 배열 위에 열 순서가 주석으로 적혀 있습니다.
- **세부 페이지 추가**: `media/` 안에 새 HTML을 만들고 `assets/nav.js`의 `SITE`에 한 줄 추가하면 모든 페이지 왼쪽 메뉴에 나타납니다. 새 페이지는 기존 페이지(예: `cuts.html`)를 복사해 본문만 바꾸면 메뉴 틀이 그대로 따라옵니다. 개요 페이지(`media/index.html`)의 카드도 하나 추가하세요.
- **새 계열 추가**: `media/` 폴더를 통째로 복사해 이름을 바꾸고(예: `it/`), 데이터와 문구를 바꾼 뒤 허브 `index.html`의 카드 틀(주석)을 채우고, `assets/nav.js`의 `SITE`에서 `soon:true` 항목을 `dir`·`pages`로 바꿉니다.
- **학종과 실기는 폴더를 나눕니다**: 학생부종합(면접) 자료는 `media/`, 실기 전형 자료는 `silgi/`에 넣습니다. 실기 세부 페이지를 만들면 `assets/nav.js`의 `영화·영상 · 실기` 항목 `pages`에 한 줄 추가하고, `silgi/index.html`의 세부 페이지 카드도 하나 추가하세요.
- **실기 자료 고치기**: 대학별 형식은 `silgi/data/schools.js`, 기출은 `silgi/data/exams.js`, 복기는 `silgi/data/boki.js`에서 해당 줄만 고치면 됩니다. 새 복기를 넣을 때는 **학생·면접관 이름, 학번, 출신 고교, 수상 상금처럼 사람을 알아볼 수 있는 내용은 빼고** 요약해 넣으세요.
- **실기 링크로 필터 공유**: `silgi/reviews.html?u=서울예대` · `?k=영상 비평` · `?p=A`(같은 수험생) · `?q=로그라인`, `silgi/glossary.html?q=몽타주`.
- **올리지 않은 실기 자료**: 영화 시나리오 원고(저작권), 수업 녹화 영상(수업 장면, 파일당 100MB가 넘어 GitHub에 올릴 수도 없음), 개인 자기소개서는 사이트에 넣지 않았습니다.
- **링크로 필터 공유**: `media/reviews.html?u=건국대학교(서울)` · `?c=시사·AI·미디어 이슈 견해` · `?y=실기` · `?r=불합` · `?q=딥페이크` 처럼 주소에 붙이면 그 조건으로 열립니다.

## 여러 컴퓨터에서 작업하기 (맥·윈도우, GitHub Desktop)

- 작업 시작 전에 **Fetch origin → Pull origin**을 눌러 다른 컴퓨터에서 한 작업을 먼저 받습니다.
- 작업이 끝나면 **Commit to main → Push origin**까지 해야 다른 컴퓨터에서 받을 수 있습니다.
- GitHub 웹에서 "Add files via upload"로 파일을 올리면 같은 이름의 파일이 통째로 덮어써집니다. 되도록 GitHub Desktop으로 올리세요.

## GitHub Pages 올리기

1. 새 저장소를 만들고 이 폴더의 파일을 모두 올립니다(`.nojekyll` 포함).
2. 저장소 Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `(root)`.
3. 1~2분 뒤 `https://<계정>.github.io/<저장소>/` 로 열립니다.

## 공개 범위 주의

GitHub Pages 사이트는 **저장소를 비공개로 해도 주소를 아는 누구나 볼 수 있습니다**(접근 제한은 GitHub Enterprise Cloud 조직에서만 가능). 원 자료집은 학교 계정 전용이므로, 올리기 전에 공개해도 되는 범위인지 확인하세요.
