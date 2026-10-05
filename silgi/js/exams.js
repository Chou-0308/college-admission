// 기출·연습 문제: 연습 문제 뽑기(타이머) + 대학별 기출 목록
(function(){
  // ---- 연습 문제 뽑기 ----
  const keys=Object.keys(PRACTICE);
  let fmt=keys[0],left=0,tick=null,phase='',last=-1;
  $('#pf').innerHTML=keys.map(k=>`<button type="button" data-v="${k}" aria-pressed="${k===fmt}">${esc(PRACTICE[k].name)}</button>`).join('');
  const mmss=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
  const stop=()=>{clearInterval(tick);tick=null};
  function setTimer(sec,label){stop();left=sec;phase=label;$('#tm').textContent=mmss(left);$('#tm').classList.remove('done');$('#tl').textContent=label;$('#tgo').textContent='타이머 시작'}
  function reset(){const P=PRACTICE[fmt];setTimer(Math.round(P.min*60),P.talk?`구상 ${P.min<1?'30초':P.min+'분'}`:`${P.min}분`)}
  function choose(k){fmt=k;last=-1;$('#pf').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===k?'true':'false'));
    $('#pp').textContent='문제 뽑기를 누르세요';$('#pr').textContent=PRACTICE[k].rule;$('#tgo').disabled=true;$('#trs').disabled=true;reset()}
  $('#pf').addEventListener('click',e=>{const b=e.target.closest('button');if(b)choose(b.dataset.v)});
  $('#pick').onclick=()=>{
    const P=PRACTICE[fmt];let words;
    // 한예종식은 실제 시험처럼 키워드 11개를 모두 보여 줌
    let i;do{i=Math.floor(Math.random()*P.sets.length)}while(P.sets.length>1&&i===last);last=i;words=P.sets[i];
    $('#pp').innerHTML=fmt==='dongbang'?`<span class="small">사진 설명</span><br>${esc(words[0])}`
      :words.map(w=>`<span class="w">${esc(w)}</span>`).join('')+(fmt==='knua'?'<br><span class="small">이 가운데 4개 이상을 골라 쓰세요</span>':'');
    $('#tgo').disabled=false;$('#trs').disabled=false;reset();
  };
  function run(){
    if(tick){stop();$('#tgo').textContent='이어서';return}
    $('#tgo').textContent='멈춤';
    tick=setInterval(()=>{left--;$('#tm').textContent=mmss(Math.max(left,0));
      if(left<=0){stop();const P=PRACTICE[fmt];
        if(P.talk&&phase.startsWith('구상')){setTimer(P.talk,`말하기 ${P.talk>=60?Math.floor(P.talk/60)+'분 '+(P.talk%60?P.talk%60+'초':''):P.talk+'초'}`.trim());run()}
        else{$('#tm').classList.add('done');$('#tl').textContent='시간 끝';$('#tgo').textContent='타이머 시작';$('#tgo').disabled=true}}},1000);
  }
  $('#tgo').onclick=run;
  $('#trs').onclick=()=>{reset();$('#tgo').disabled=false};
  choose(fmt);

  // ---- 대학별 기출 ----
  const id=n=>'s-'+encodeURIComponent(n).replace(/%/g,'');
  const order=[...new Set(EX.map(e=>e.u))];
  $('#jump').innerHTML=order.map(u=>`<a href="#${id(u)}">${esc(u)}</a>`).join('');
  const lab={'작문':'제시어·문제','스토리텔링':'제시 사진','공개 문항':'공개 문항','이야기 구술':'제시 자료','영상 비평':'감상 영상','시나리오 분석':'제시 시나리오','장면 구성':'문제','구술':'문제','면접':''};
  $('#exlist').innerHTML=order.map(u=>`<div class="exu" id="${id(u)}"><h3>${esc(u)}</h3>${
    EX.filter(e=>e.u===u).map(e=>`<div class="exy">
      <div class="yh">${esc(e.y)} <span class="gtag">${esc(e.kind)}</span></div>
      ${e.items.length?`<div><div class="lab">${lab[e.kind]||'문제'}</div><ul>${e.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
      ${e.img&&e.img.length?`<div><div class="lab">이미지 분석·제시 이미지</div><ul>${e.img.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
      ${e.qs&&e.qs.length?`<div><div class="lab">그때 나온 면접 질문</div><div class="qchips">${e.qs.map(q=>`<span>${esc(q)}</span>`).join('')}</div></div>`:''}
    </div>`).join('')}</div>`).join('');
  if(location.hash){const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el)el.scrollIntoView()}
})();
