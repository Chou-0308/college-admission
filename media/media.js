// 미디어·영상 계열 공통: 상수, 도우미, 출처 (왼쪽 메뉴는 ../assets/nav.js)
const RES_ORDER=["최초합","충원합","불합","미기재"];
const CATS=["생기부 활동 설명·꼬리질문","자기소개·지원동기","마지막 할 말·자기 어필","시사·AI·미디어 이슈 견해","학교 이해·입학 후 계획","제시문·실기·포트폴리오","리더십·협업·갈등 경험","전공 지식·개념 설명","독서·감상 작품","인성·가치관·태도","진로·롤모델·미래상","성적·출결·학업 태도","아이스브레이킹"];
const GRPS=["미디어·언론·방송","영화·영상·방송제작","광고·홍보","문화·디지털콘텐츠","애니·게임·디자인"];
// 전형: 원문의 '학생부교과(표기)' 같은 표기는 묶어서 봅니다
const TRACKS=["학생부종합","학생부교과","실기","기타"];
const track=r=>r.y.replace(/\(표기\)/,'');
// 4년제 탭은 4년제 후기만, 전문대 탭(jeonmun/hugi.html)은 전문대 후기만
if(typeof D!=='undefined')scopeArr(D,r=>r.u);
if(typeof NOTES!=='undefined')scopeObj(NOTES);
if(typeof NOTES27!=='undefined')scopeObj(NOTES27);
const V=typeof D!=='undefined'?D.filter(r=>!r.x):[];
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pill=r=>`<span class="pill p-${r}">${r}</span>`;
const tidyType=s=>s.replace(/\(표기\)/,'').replace(/^기타\((.*)\)$/,'$1').replace(/^미표기.*$/,'미표기');

(function(){
  const f=document.createElement('footer');
  f.textContent='출처: 경기도교육청 「2026학년도 면접후기 자료집」(goejinhak.kr, 학교 계정 로그인 필요). 영화·영상·미디어·광고·콘텐츠·애니·게임 관련 학과명으로 골라낸 196건을 이미지 원본에서 옮겨 적었으며, 어학·문헌정보·게임소프트웨어 등 22건은 제외했습니다. 답변은 원문을 옮기면서 문장을 일부 줄였고, 각 카드의 ‘p.’는 원본 자료집 쪽번호입니다. 질문 유형은 키워드 자동 분류라 일부 어긋날 수 있습니다. ‘2027 면접 일정’, ‘특성화고 전형’, ‘대학 발표 입결’, ‘공식 자료로 보는 면접 준비’는 경기도교육청 「2027학년도 면접전형 분석 자료집」, 「2027학년도 학생부종합전형 분석 자료집」, 「2027학년도 특성화고졸업자 특별전형 현황 안내」에서 옮겼습니다(이미지 원본 판독). 자료집도 오류 가능성을 밝히고 있으니 지원 전에 대학 요강을 확인하세요. 원 자료가 학교 계정 전용이므로 외부 공유는 피해 주세요.';
  (document.querySelector('.main')||document.body).appendChild(f);
})();
