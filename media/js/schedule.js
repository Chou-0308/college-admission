// 2027 면접 일정 표 (D-day는 보는 날 기준으로 자동 계산)
const TODAY=(()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())})();
const dd=iso=>{const [y,m,d]=iso.split('-').map(Number);return Math.round((new Date(y,m-1,d)-TODAY)/864e5)};
$('#stbody').innerHTML=SCHED.map(r=>{
  const [iso,lbl,u,t,f,gap,m,fmt,ev,memo]=r;const n=dd(iso);
  const tag=n<0?`<span class="dday past">지남</span>`:n===0?`<span class="dday soon">오늘</span>`:`<span class="dday${n<=14?' soon':''}">D-${n}</span>`;
  const g=gap==null?'':`<span class="gap${gap<=4?' tight':''}">${gap}일 준비</span>`;
  return `<tr><td class="n">${esc(lbl)}<br>${tag}</td><td><b>${esc(u)}</b><span class="sm">${esc(t)}</span></td>
   <td class="n">${esc(f||'–')}${g?`<span class="sm">${g}</span>`:''}</td><td>${esc(m||'요강 확인')}</td>
   <td>${esc(fmt||'–')}${ev?`<span class="sm">${esc(ev)}</span>`:''}</td><td>${esc(memo||'')}</td></tr>`}).join('');
