// 특성화고졸업자 특별전형 표
$('#sptbody').innerHTML=SPEC.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="n">${esc(r[3])}</td><td class="n">${esc(r[4])}</td><td class="n">${esc(r[5])}</td><td>${esc(r[6])}</td></tr>`).join('');
