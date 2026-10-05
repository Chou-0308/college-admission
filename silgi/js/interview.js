// 면접 대비: 복기 질문 유형 집계, 면접지 체크리스트(브라우저에만 저장), 구술 단골 개념
(function(){
  // ---- 질문 유형 집계(QT는 silgi.js) ----
  const withQ=RECAPS.filter(r=>r.qa.length);
  const allQ=withQ.flatMap(r=>r.qa.map(x=>({q:x[0],u:r.u,y:r.y,src:r.src})));
  const rows=QT.map(([nm,re])=>{const hit=withQ.filter(r=>r.qa.some(x=>re.test(x[0])));
    return {nm,n:hit.length,ex:allQ.filter(x=>re.test(x.q))}}).sort((a,b)=>b.n-a.n);
  $('#freq-sub').innerHTML=`질문이 적힌 복기·자가진단 <b>${withQ.length}건</b>, 질문 <b>${allQ.length}개</b>를 유형별로 묶었습니다. 막대는 그 유형의 질문이 한 번이라도 나온 기록 수입니다(키워드로 자동 분류해 일부 어긋날 수 있음). 막대를 누르면 실제 질문을 보여 줍니다.`;
  const max=Math.max(...rows.map(r=>r.n));
  let sel=rows[0].nm;
  function draw(){
    $('#chart').innerHTML=rows.map(r=>`<button type="button" class="bar" aria-pressed="${r.nm===sel}" data-n="${esc(r.nm)}"><span class="nm">${esc(r.nm)}</span><span class="tr"><span class="fl" style="width:${(r.n/max*100).toFixed(1)}%"></span></span><span class="ct">${r.n}건 · ${Math.round(r.n/withQ.length*100)}%</span></button>`).join('');
    const r=rows.find(x=>x.nm===sel);
    const seen=new Set();const ex=r.ex.filter(x=>{const k=x.q.replace(/\s/g,'');if(seen.has(k))return false;seen.add(k);return true}).slice(0,14);
    $('#samples').innerHTML=`<h3>${esc(sel)} · 실제 질문</h3><ol>${ex.map(x=>`<li>${esc(x.q)}<span class="src">${esc(x.u)} · ${esc(yrLabel(x.y))}</span></li>`).join('')}</ol>`;
  }
  $('#chart').addEventListener('click',e=>{const b=e.target.closest('.bar');if(!b)return;sel=b.dataset.n;draw()});
  draw();

  // ---- 면접지 체크리스트 ----
  const SHEET=[
    ["영화 취향",["가장 좋아하는 한국 영화","가장 좋아하는 외국 영화","가장 좋아하는 한국 감독(작품별로 한 줄씩)","가장 좋아하는 외국 감독(작품별로 한 줄씩)","좋아하는 장르와 이유","내가 생각하는 최악의 영화","최근에 본 영화","함께 일하고 싶은 촬영감독(전공별 스태프)","본 단편영화","가 본 영화제","지원 학교 출신 감독"]],
    ["영화 밖의 취향",["좋아하는 소설 3편","좋아하는 시 3편","좋아하는 회화","좋아하는 음악","영화·소설 말고 감명받은 것(전시, 공연, 조각 등)"]],
    ["나와 영화",["영화를 하게 된 계기","영화과에 가고 싶은 이유","하고 싶은 전공과 이유","내가 하고 싶은 영화","영화를 한마디로 표현한다면","연출(내 전공)이란 무엇이라고 생각하나","감독(내 전공)의 덕목","연출할 때 주의할 점","연출할 때 가장 힘들 때","영화를 찍어 본 경험","시나리오를 써 본 적","사용해 본 카메라와 편집 툴","다른 연출 지망생과 나의 다른 점"]],
    ["나",["나의 취미","나의 장단점","가장 중요하게 생각하는 가치","10년 뒤의 모습","자기 PR(마지막 한마디)","우리 학교·우리 지역 PR","상을 받아 본 경험","여기까지 오는 동안의 심정"]],
    ["공부와 입시",["영화 공부는 어떻게 했나","공부할 때 본 책","학원을 다녔나","학업 계획","이 학교에 오고 싶은 이유","떨어진다면","내신·수능 성적","어디 어디 지원했나"]]
  ];
  const KEY='silgi-sheet';
  let done={};try{done=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
  const total=SHEET.reduce((a,g)=>a+g[1].length,0);
  const prog=()=>{const n=Object.values(done).filter(Boolean).length;$('#prog').textContent=`${total}개 중 ${n}개 준비함`};
  $('#checks').innerHTML=SHEET.map(([g,items],gi)=>`<h3 style="margin:18px 0 8px">${esc(g)}</h3><ul class="check">${items.map((t,ti)=>{const k=gi+'-'+ti;
    return `<li><label><input type="checkbox" data-k="${k}"${done[k]?' checked':''}><span>${esc(t)}</span></label></li>`}).join('')}</ul>`).join('');
  $('#checks').addEventListener('change',e=>{const c=e.target.closest('input[data-k]');if(!c)return;done[c.dataset.k]=c.checked;
    try{localStorage.setItem(KEY,JSON.stringify(done))}catch(err){}prog()});
  $('#ckclr').onclick=()=>{done={};try{localStorage.removeItem(KEY)}catch(e){}$('#checks').querySelectorAll('input').forEach(c=>c.checked=false);prog()};
  prog();

  // ---- 구술 단골 개념 ----
  const C=["작가주의","시퀀스","씬","스토리와 플롯","내러티브","플롯 포인트","복선","몽타주","충돌 몽타주","디졸브","페이드","이미지너리 라인","30도 법칙","미장센","마스터숏","설정숏","커버리지","시점숏","딥포커스","롱테이크","화면비","시네마스코프","클로즈업","줌","달리","팬","틸트","표준렌즈","망원렌즈","광각렌즈","조리개","피사계 심도","색온도","할레이션","실루엣","교차 편집","점프컷","슬레이트","테이크","동시녹음","후시녹음","폴리","오프스크린 사운드","3막 구조","셔레이드","맥거핀","데우스 엑스 마키나","장르","필름 누아르","소격 효과","리얼리즘과 형식주의","뉴 아메리칸 시네마","풍자","페이소스","프리·프로덕션·포스트","독립영화","스크린쿼터","멀티플렉스","OTT","트랜스미디어","세계 3대 영화제"];
  $('#cchips').innerHTML=C.map(c=>`<a class="tag" style="font-size:.84rem;padding:3px 9px;text-decoration:none" href="glossary.html?q=${encodeURIComponent(c)}">${esc(c)}</a>`).join('');
})();
