const HQ = {
  owner: 'steventjwai-newbie',
  repo: 'halus-hq',
  issue: 1
};
const CHAT_KEY = 'halus_chat_v1';
let MEM = {decisions: [], notes: []};

function loadLocalChat(){
  try { return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveLocalChat(arr){
  localStorage.setItem(CHAT_KEY, JSON.stringify(arr.slice(-80)));
}
function pushChat(role, text){
  const arr = loadLocalChat();
  arr.push({role, text, at: new Date().toISOString()});
  saveLocalChat(arr);
}
function renderSaved(){
  const log = document.getElementById('log');
  if(!log) return;
  loadLocalChat().forEach(m=>{
    const d=document.createElement('div');
    d.className = 'msg ' + (m.role==='me'?'me':'bot');
    d.textContent = m.text;
    log.appendChild(d);
  });
  log.scrollTop = 9e9;
}
async function loadMemory(){
  try {
    const r = await fetch('memory.json?t=' + Date.now());
    if(r.ok) MEM = await r.json();
  } catch(e){}
  try {
    const r = await fetch('https://api.github.com/repos/'+HQ.owner+'/'+HQ.repo+'/issues/1/comments?per_page=30');
    if(r.ok){
      const comments = await r.json();
      comments.forEach(c=>{
        MEM.notes = MEM.notes || [];
        MEM.notes.push({at: c.created_at, who: c.user && c.user.login, text: c.body});
      });
    }
  } catch(e){}
}
function memoryAnswer(q){
  const blob = ((MEM.decisions||[]).join(' ') + ' ' + (MEM.notes||[]).map(n=>n.text).join(' ')).toLowerCase();
  if(!blob) return null;
  const words = q.toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>3);
  if(words.some(w=>blob.includes(w))){
    const hits = (MEM.notes||[]).filter(n=>words.some(w=>n.text.toLowerCase().includes(w)));
    if(hits.length) return 'From HQ memory: ' + hits.slice(-2).map(n=>n.text).join(' | ');
    return 'Locked decisions: ' + (MEM.decisions||[]).join(' · ');
  }
  return null;
}
function pinNote(){
  const last = loadLocalChat().filter(m=>m.role==='me').slice(-1)[0];
  const text = last ? last.text : 'Note from HALUS HQ';
  const title = encodeURIComponent('HQ note');
  const body = encodeURIComponent(text + '\n\n(From live HQ page)');
  window.open('https://github.com/'+HQ.owner+'/'+HQ.repo+'/issues/new?labels=hq-note&title='+title+'&body='+body, '_blank');
}
