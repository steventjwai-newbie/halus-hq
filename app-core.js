const AUTH_USER='roujing', AUTH_PASS='adminrj';
const TABS=[
  ['home','Overview'],
  ['market','Market research'],
  ['names','Names & lockups'],
  ['brand','Brand guidelines'],
  ['offer','SKUs & prices'],
  ['lang','Trilingual system'],
  ['actions','Actions & checklist']
];

const KB=[
  {id:'gap',tags:'gap market middle shed humidity',a:'The gap is the missing middle: RM39-89 singles and RM129-249 kits. Shopee sets shed; Sigma/ZOEVA sit at Sephora prices. Dedicated Malaysian tool houses are scarce. Carya is the closest local name but is a colour brand first.'},
  {id:'import',tags:'import china supply',a:'Over about 70% of beauty tools in Malaysia are imported, largely from China, then Korea and Japan. Local QC and a 30-day no-shed swap is a trust lever.'},
  {id:'climate',tags:'humid climate oil sponge bacteria',a:'Tools should be designed for heat and humidity: fast-dry synthetics, low-absorption fibres, triangle puffs, cushion tools, drying stands. Damp sponges in 80-90% humidity become a bacteria farm.'},
  {id:'position',tags:'positioning promise line',a:'Positioning: professional-feeling makeup tools designed for humid weather, oily skin, and real Malaysian days. Line: Fine tools. Humid days. Working master brand: HALUS.'},
  {id:'names',tags:'name halus embun ferrule kilau bayu tropica velura sorae',a:'Lead with HALUS (Malay for fine/refined). Backups: EMBUN (dew) and FERRULE (pro English). TROPICA is a line name, not the master brand. Clear MyIPO class 21 and class 3 before printing.'},
  {id:'price',tags:'price rm sigma real techniques carya sephora',a:'Doorway RM19-29. Hero brush RM49-79 (H-01 foundation RM69). Core 6 kit RM189. Travel 4 RM89. Climate sponge RM32. You sit above junk, under Sigma, beside Real Techniques.'},
  {id:'sku',tags:'sku h-01 core 6 launch',a:'Launch 11 SKUs only: H-01 foundation RM69, H-02 powder RM59, H-03 cheek RM49, H-04 concealer RM39, H-05 crease RM49, H-06 lip RM29, sponge RM32, triangle puff 2s RM24, cleanser RM25, Core 6 RM189, Travel 4 RM89.'},
  {id:'brand',tags:'colour pack type pink gold',a:'Ivory #F6F1E8, espresso #2C2416, laterite #C4845A, dew sage #8A9A86, ferrule gold #B8955A, monsoon grey #6E6A64. No pink, no rose gold, no 14-piece rainbow sets. Wordmark serif + ferrule-ring signet. Object is the logo: espresso handle, champagne ferrule, flat anti-roll grip, hanging hole.'},
  {id:'voice',tags:'voice copy tone',a:'Write like a good MUA texting the truth. EN: Wash it. Stand it up. BM: Cuci. Dirikan. Biar kering. Lead with performance in this weather, not vegan.'},
  {id:'lang',tags:'bm en chinese language website social',a:'EN is source of truth. BM is conversion. CN (Simplified on digital) is trust. One site with / /ms/ /zh/. Do not run three social accounts. TikTok BM first, IG EN+BM, Xiaohongshu CN only. Never three languages in one caption.'},
  {id:'legal',tags:'npra halal cleanser notification',a:'Brushes and dry sponges are usually accessories. Cleanser needs NPRA notification via QUEST3+ with a Malaysian CNH. Do not stamp halal on tools until fibre, glue and pack are documented.'},
  {id:'gtm',tags:'tiktok shopee watsons channel',a:'Months 1-3: TikTok Shop + Shopee Mall. Months 4-6: Watsons once reviews exist. Sephora is year two. Content: shed test, midday PJ humidity, 90-second wudu touch-up.'},
  {id:'guarantee',tags:'shed 30 day swap',a:'If a brush sheds in 30 days, replace it. Publish the policy. That is the claim that makes a new local tools brand believable.'}
];

function login(e){
  e.preventDefault();
  const u=document.getElementById('user').value.trim();
  const p=document.getElementById('pass').value;
  if(u===AUTH_USER && p===AUTH_PASS){
    sessionStorage.setItem('halus_ok','1');
    openApp();
  } else document.getElementById('err').textContent='Wrong username or password.';
  return false;
}
function openApp(){
  document.getElementById('gate').style.display='none';
  document.getElementById('app').classList.add('on');
  const nav=document.getElementById('nav');
  nav.innerHTML=TABS.map(([id,l])=>'<button data-id="'+id+'">'+l+'</button>').join('');
  nav.onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.id)};
  show('home');
  bot('This desk holds the HALUS briefing from 14 Sep 2026. Ask about the gap, names, prices, brand rules, or the 30-day plan.');
}
function show(id){
  [...document.querySelectorAll('.nav button')].forEach(b=>b.classList.toggle('active',b.dataset.id===id));
  document.getElementById('main').innerHTML=PAGES[id]||'';
  if(id==='actions') bindChecks();
}
function bot(t){const d=document.createElement('div');d.className='msg bot';d.textContent=t;document.getElementById('log').appendChild(d);document.getElementById('log').scrollTop=9e9}
function me(t){const d=document.createElement('div');d.className='msg me';d.textContent=t;document.getElementById('log').appendChild(d)}
function ask(){
  const el=document.getElementById('q');const t=el.value.trim();if(!t)return;
  el.value='';me(t);
  const q=t.toLowerCase();
  let best=null,score=0;
  KB.forEach(k=>{
    let s=0;k.tags.split(' ').forEach(w=>{if(q.includes(w))s+=2});
    k.a.toLowerCase().split(/[^a-z0-9]+/).forEach(w=>{if(w.length>4 && q.includes(w))s+=1});
    if(s>score){score=s;best=k}
  });
  if(score<2) bot('I only answer from this briefing. Try: Why HALUS? What is the price ladder? How do we handle BM / EN / CN? What do we launch first?');
  else bot(best.a);
}
document.addEventListener('keydown',e=>{if(e.key==='Enter' && !e.shiftKey && document.activeElement && document.activeElement.id==='q'){e.preventDefault();ask()}});

const CHECKS=[
  'File MyIPO search on HALUS, HALUS TOOLS, EMBUN TOOLS, FERRULE (class 21 + class 3)',
  'Lock @halustools on IG, TikTok, Shopee, .com and .my',
  'Buy and abuse top 8 Shopee sets + RT Expert Face + one Sigma foundation',
  'Photograph shedding and sponge dry time in humidity',
  'Interview 5 MUAs, 5 office/hijabi wearers, 5 students',
  'Lock one OEM: custom ferrule stamp, 500-unit H-01 MOQ',
  'Prototype only H-01 + climate sponge + cleanser',
  'Start NPRA path for Fast-Dry Cleanse (Malaysian CNH)',
  'TikTok name test: HALUS vs EMBUN on the same product footage',
  'Price-test H-01 at RM59 and RM69',
  'Write EN parent PDPs; BM conversion copy; CN only on 11 SKUs + guarantee',
  'Draft 30-day swap policy in EN / BM / CN and put it on pack',
  'Shoot shed-test and midday PJ humidity clips',
  'Open Shopee Mall + TikTok Shop official',
  'Do not launch a 14-piece set'
];
function bindChecks(){
  const box=document.getElementById('checks');if(!box)return;
  const saved=JSON.parse(localStorage.getItem('halus_checks')||'[]');
  box.innerHTML=CHECKS.map((c,i)=>'<label class="check"><input type="checkbox" data-i="'+i+'" '+(saved.includes(i)?'checked':'')+'/><span class="'+(saved.includes(i)?'done':'')+'">'+c+'</span></label>').join('');
  box.onchange=()=>{
    const on=[...box.querySelectorAll('input:checked')].map(x=>+x.dataset.i);
    localStorage.setItem('halus_checks',JSON.stringify(on));
    bindChecks();
  };
}
