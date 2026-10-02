# 대입 자료실 디자인 시스템

경기도교육청 진로진학 자료집을 계열별로 정리한 정적 사이트 「대입 자료실」의 디자인 시스템입니다. 면접 후기 양식의 **칸**을 모티프로 한, 읽기 중심의 차분한 자료 페이지를 만듭니다. 장식보다 숫자와 출처가 먼저 보이게 하세요.

## 내용 원칙 (Content)

- **존댓말 평서문**으로 씁니다: "…입니다", "…하세요". 감탄·과장·이모지는 쓰지 않습니다.
- **숫자를 앞에** 둡니다: "194건 중 130건(67%)이 서류기반 면접입니다." 비율에는 기준 건수를 함께 적습니다.
- **출처를 숨기지 않습니다.** 페이지 끝 `footer`에 자료집 이름과 판독 방식, "지원 전 대학 요강 확인" 문장을 둡니다. 카드·표에는 원본 쪽번호(`p.34`)를 남깁니다.
- 오해할 수 있는 숫자에는 경고를 붙입니다: `<b class="warn">합격선으로 읽으면 안 됩니다</b>`.
- 한국어 제목은 `word-break: keep-all`로 어절 단위 줄바꿈합니다. 구분점은 가운뎃점 ` · `, 범위는 `→`, 학과 묶음은 `〈 〉`.
- 원 자료는 학교 계정 전용입니다. 외부 공개 범위를 확인하라는 안내를 지우지 마세요.

## 색 (Color)

- 바탕은 `bg`, 그 위에 올라오는 면(표·카드·띠·입력창)은 `paper`, 조용한 채움(표 머리·호버·막대 트랙)은 `soft`.
- 본문은 `ink`, 보조 글(eyebrow·lede·라벨·출처)은 `muted`. 둘 다 `bg`·`paper`·`soft` 위에서 두 테마 모두 4.5:1 이상입니다.
- 브랜드 색은 남색 `accent` 하나입니다. 링크, 막대, 포커스 링, 현재 메뉴, 카드 위 3px 선에만 씁니다. 그 뒤 옅은 채움은 `accent-soft`.
- 결과 색은 의미가 고정입니다: 최초합 `pass`, 충원합 `wait`, 불합 `fail`, 미기재 `na` — 각각 `-bg` 위에. **반드시 글자(최초합 등)와 함께** 쓰고 색만으로 구분하지 마세요. 라이트 테마의 `pass`·`wait`·`na` 알약은 4.1–4.4:1로 AA에 조금 못 미치며, 원본 값을 그대로 두었습니다.
- 강조 형광펜은 `hl`, 주의 강조는 `em`(주황). 둘 다 문단당 한두 번만.
- 테두리는 `line` 1px 헤어라인. 구획은 그림자가 아니라 선으로 나눕니다.
- 다크 테마는 같은 이름의 토큰이 바뀌는 방식입니다(`[data-theme="dark"]`, 또는 시스템 다크 모드). 색을 직접 적지 말고 항상 토큰을 쓰세요.

## 글자 (Type)

- 글꼴은 **고딕 하나**로 통일합니다: `body` 패밀리(맑은 고딕 → Apple SD Gothic Neo → Noto Sans KR). Noto Sans KR 400/500/700/800은 Google Fonts에서 불러옵니다. 숫자 칸은 `font-variant-numeric: tabular-nums`.
- 제목: `h1`(800, 최대 2.7rem, 화면에 따라 1.9rem까지 줄어듦), `h2` 1.45rem, `h3` 1.05rem — 모두 700, 자간 -0.02em, 행간 1.3.
- 본문은 `body` 15px / 1.7. 섹션 부제는 `sec-sub`(muted, 최대 65ch), 표는 `table`, 작은 설명은 `caption`, 라벨은 `eyebrow`·`th`, 알약·태그는 `chip`.
- 글 단은 `width-read`(760px)를 넘기지 않습니다. 표·탐색기만 넓게 씁니다.

## 간격·모서리·레이아웃

- 페이지: 좌우 `space-page-x`, 위 `space-page-top`, 아래 `space-page-bottom`. 섹션 사이 `space-section`.
- 카드·상자 안쪽은 `space-card-y` × `space-card-x`, 카드 격자 간격 `space-grid`, 목록 간격 `space-list`, 칩 간격 `space-chip`.
- 모서리는 작게: 막대 `radius-xs`, 태그·메모 `radius-sm`, 입력·버튼 `radius-md`, 알약·점프 링크만 `radius-pill`. 카드와 표는 각진 모서리(0)입니다.
- 셸: 왼쪽 메뉴 `width-side` + 본문, 사이 `space-shell-gap`, 최대 `width-shell`. `bp-nav`(900px) 아래에서 메뉴는 가로 알약 줄이 됩니다.
- 상태: 호버는 `soft` 또는 `accent-soft` 채움, 눌림(`aria-pressed`)·현재(`aria-current`)는 `accent`. 포커스는 모든 컨트롤에 `accent` 2px 실선 outline — `paper`·`bg` 위에서 두 테마 모두 7:1 이상. `prefers-reduced-motion`이면 전환 효과를 끕니다.

## 컴포넌트

모든 컴포넌트는 사이트가 실제로 쓰는 `assets/style.css`의 클래스 마크업입니다. 색·간격 값은 `assets/tokens.css`(원본 값은 `design/tokens.json`)에 있고, 여기를 고치면 사이트 전체에 바로 반영됩니다. 전체 미리보기는 `design/index.html`입니다. JS 라이브러리가 아니라 HTML 패턴이므로, 각 README의 마크업을 그대로 쓰고 데이터만 채우세요.

- 틀: `PageHeader`, `SideNav`(메뉴는 `nav.js`의 `SITE` 한 곳에서만 고침)
- 숫자·데이터: `StatStrip`, `Findings`, `BarChart`, `DataTable`, `ReviewCard`, `KeyBox`, `Badges`
- 탐색: `FilterBar`, `CardLink`, `JumpLinks`
- 글: `TipColumns`, `QuestionList`, `Emphasis`

## 아이콘·이미지

아이콘·로고·사진을 쓰지 않습니다. 사이트 이름은 `h1`/`.side-home`의 글자로만 표시합니다. 상태는 아이콘 대신 알약(`Badges`)의 글자로, 방향은 `→`·`›` 같은 문자로 나타냅니다. 새 페이지에 장식 이미지나 이모지를 넣지 마세요.

## 동기화되지 않은 것

- 원본 CSS의 `--f-display`, `--f-mono`는 `--f-body`의 별칭이라 별도 토큰이 아니라 `assets/style.css`에서 `--font-body`로 연결했습니다.
- 글꼴 파일·로고는 저장소에 없습니다(맑은 고딕은 시스템 글꼴, Noto Sans KR은 Google Fonts).
- 컴포넌트는 빌드할 라이브러리가 없어 원본 마크업을 손으로 옮긴 **정적 예시**입니다(데이터는 예시값). 출처: `index.html`, `assets/nav.js`, `media/*.html`, `media/js/*.js`.
