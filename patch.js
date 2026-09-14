(function(){
  const rawOpen = openApp;
  openApp = async function(){
    await loadMemory();
    rawOpen();
    const log = document.getElementById('log');
    if(log && loadLocalChat().length){
      log.innerHTML = '';
      renderSaved();
    } else {
      bot('Memory loaded. Chat stays on this phone. Type remember: then a decision. Pin last note to HQ to store it on GitHub for other devices.');
    }
  };
  const rawMe = me;
  me = function(t){ rawMe(t); pushChat('me', t); };
  const rawBot = bot;
  bot = function(t){ rawBot(t); pushChat('bot', t); };
  const rawAsk = ask;
  ask = function(){
    const el = document.getElementById('q');
    const t = (el.value || '').trim();
    if(!t) return;
    const low = t.toLowerCase();
    if(low.startsWith('remember:') || low.startsWith('note:')){
      el.value = '';
      me(t);
      bot('Noted on this device. Click Pin last note to HQ so phones and Grok Bot can see it.');
      return;
    }
    const fromMem = memoryAnswer(t);
    if(fromMem){
      el.value = '';
      me(t);
      bot(fromMem);
      return;
    }
    rawAsk();
  };
})();
