(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Shun: ingredient of the month
  var S=[['January','Daikon radish','Sweet and juicy in the cold months. Simmer thick rounds in dashi or grate it raw over grilled fish.','Simmered daikon, grated garnish'],
    ['February','Komatsuna greens','A mild, tender leafy green that wilts in seconds. Perfect in miso soup or a quick sesame dressing.','Miso soup, stir-fries'],
    ['March','Spring cabbage','Loose, soft leaves that are lovely raw. Shred finely and salt lightly for a crisp side dish.','Quick pickles, salads'],
    ['April','Bamboo shoots','The taste of spring in Japan. Fresh shoots are simmered with rice or in a light dashi broth.','Takenoko rice, simmered dishes'],
    ['May','Fresh peas','Bright green and sweet. Cook them with rice and a pinch of salt for a classic spring rice dish.','Pea rice, soups'],
    ['June','Ume plums','Green ume arrive in early summer and are salted to make umeboshi, the tangy pickled plum.','Pickles, rice balls'],
    ['July','Japanese cucumber','Thin-skinned and crunchy. Smash, salt and dress with rice vinegar and sesame for an instant side.','Sunomono, cold salads'],
    ['August','Eggplant','Silky when grilled or fried. Top with grated ginger and a splash of soy sauce.','Grilled eggplant, miso glaze'],
    ['September','Sweet potato','Satsumaimo turns sweet and fluffy when roasted. A favourite autumn street snack.','Roasted, tempura, rice'],
    ['October','Shiitake mushrooms','Meaty and full of savoury depth. Fresh ones grill beautifully; dried ones make a rich vegan dashi.','Grilled, dashi, rice'],
    ['November','Yuzu citrus','Fragrant zest that lifts soups, dressings and simmered dishes with just a few shavings.','Ponzu, zest garnish'],
    ['December','Napa cabbage','The backbone of winter hot pots. It turns sweet and tender after a few minutes in simmering broth.','Nabe hot pot, pickles']];
  var sh=document.getElementById('shun');
  if(sh){var s=S[new Date().getMonth()];sh.querySelector('.mon b').textContent=s[0];sh.querySelector('h2').textContent=s[1];sh.querySelector('.txt p').textContent=s[2];sh.querySelector('.use').textContent='Try it in: '+s[3];}
  // Bento balance builder
  var COL={red:'#C8473A',yellow:'#E6B93A',green:'#6E9A3A',white:'#F4F1E6',black:'#2C2A26'};
  var bf=document.getElementById('bento');
  function bento(){if(!bf)return;var g={grain:[],protein:[],veg:[],side:[]},cols={};
    bf.querySelectorAll('input:checked').forEach(function(x){g[x.dataset.grp].push(x.parentNode.textContent.trim());cols[x.dataset.col]=1;});
    var gc=0;for(var k in g){var el=document.querySelector('.c-'+k);el.classList.toggle('on',g[k].length>0);el.innerHTML=g[k].length?g[k].map(function(t){return '<span>'+t+'</span>';}).join(''):el.dataset.empty;if(g[k].length)gc++;}
    var cc=Object.keys(cols).length;
    document.querySelectorAll('#b-dots i').forEach(function(d){var on=!!cols[d.dataset.c];d.classList.toggle('on',on);d.style.background=on?COL[d.dataset.c]:'transparent';});
    document.getElementById('b-g').textContent=gc+'/4';document.getElementById('b-c').textContent=cc+'/5';
    var t=gc===4&&cc>=4?'Beautifully balanced. You have every food group and a colourful, appetising box.':gc===4?'All four groups are in. Add another colour or two to make the box more varied and appealing.':gc>=2?'A good start. Fill the empty compartments so the box has grains, protein, vegetables and a small side.':'Pick at least one item from each group to start building your box.';
    document.getElementById('b-t').textContent=t;}
  if(bf){bf.addEventListener('change',bento);bento();}
  // Rice and dashi calculator
  var tabs=document.querySelectorAll('[role=tab]');
  tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});});});
  var cups=2,lit=1;
  function rice(){var o=document.getElementById('r-cups');if(!o)return;var ty=document.querySelector('[name=rt]:checked').value,w=ty==='brown'?270:ty==='sushi'?190:200;
    o.textContent=cups+(cups===1?' cup':' cups');document.getElementById('r-g').textContent=cups*150+' g';document.getElementById('r-w').textContent=cups*w+' ml';document.getElementById('r-s').textContent=cups*2+'–'+(cups*2+1);
    document.getElementById('r-h').textContent=ty==='brown'?'Rinse, then soak brown rice for at least 1 hour before cooking.':ty==='sushi'?'Slightly less water gives firmer grains that hold seasoned rice vinegar well.':'Rinse until the water runs almost clear, then soak for 30 minutes.';}
  function dashi(){var o=document.getElementById('d-l');if(!o)return;var ty=document.querySelector('[name=dt]:checked').value;
    o.textContent=lit.toFixed(1)+' L';document.getElementById('d-w').textContent=Math.round(lit*1000)+' ml';
    var k=ty==='cold'?15:10;document.getElementById('d-k').textContent=Math.round(lit*k)+' g';
    var x=document.getElementById('d-x'),xl=document.getElementById('d-xl'),h=document.getElementById('d-h');
    if(ty==='classic'){x.textContent=Math.round(lit*20)+' g';xl.textContent='bonito flakes';h.textContent='Warm the kombu slowly and remove it just before boiling. Add the flakes, steep for 2 minutes, then strain.';}
    else if(ty==='vegan'){x.textContent=Math.max(1,Math.round(lit*3))+' pcs';xl.textContent='dried shiitake';h.textContent='Soak kombu and shiitake in cold water for several hours or overnight, then warm gently. Plant-based and rich.';}
    else{x.textContent='8–12 h';xl.textContent='fridge steep';h.textContent='Simply leave kombu in cold water in the fridge. Use within 3 days.';}}
  document.querySelectorAll('[data-cups]').forEach(function(x){x.addEventListener('click',function(){cups=Math.min(6,Math.max(1,cups+parseInt(x.dataset.cups,10)));rice();});});
  document.querySelectorAll('[data-lit]').forEach(function(x){x.addEventListener('click',function(){lit=Math.min(4,Math.max(.5,lit+parseFloat(x.dataset.lit)));dashi();});});
  document.querySelectorAll('[name=rt]').forEach(function(x){x.addEventListener('change',rice);});
  document.querySelectorAll('[name=dt]').forEach(function(x){x.addEventListener('change',dashi);});
  rice();dashi();
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('wm_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('wm_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
