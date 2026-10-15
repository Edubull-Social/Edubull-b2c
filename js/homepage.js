const stages = {
  primary: [['LKG','L','lkg','First steps, big discoveries'],['UKG','U','ukg','Building a bright foundation'],['Class I','1','class-1','A world of new beginnings'],['Class II','2','class-2','Growing skills, growing smiles'],['Class III','3','class-3','Curiosity takes the lead'],['Class IV','4','class-4','Connecting ideas, finding wonder'],['Class V','5','class-5','Ready for the next adventure']],
  middle: [['Class VI','6','class-6','Explore ideas. Build understanding.'],['Class VII','7','class-7','New challenges, new confidence'],['Class VIII','8','class-8','A strong foundation for what’s next']],
  senior: [['Class IX','9','class-9','Go deeper into every discovery'],['Class X','10','class-10','Build your exam-day confidence'],['Class XI','11','class-11','Follow your interests further'],['Class XII','12','class-12','Prepare for a world of possibilities']]
};
const colors = [['#e9efdf','#7c945d'],['#f9edd7','#b49157'],['#eee9f3','#9380a3'],['#e5eef2','#6a91a1'],['#f6e7df','#b3876e'],['#edf0d9','#919957'],['#e6ece5','#779079']];
const grid = document.querySelector('#class-grid');
function render(stage) {
  grid.innerHTML = stages[stage].map(([name,badge,slug,description],i) => `<a class="class-card" href="class.html?grade=${slug}" style="--tint:${colors[i%colors.length][0]};--tone:${colors[i%colors.length][1]}"><div class="class-card-top"><span class="grade-badge">${badge}</span><h3>${name}</h3><span class="arrow"><svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></span></div><p>${description}</p></a>`).join('');
}
const tabs = [...document.querySelectorAll('[data-stage]')];
function selectTab(tab) {
  tabs.forEach(item => { item.setAttribute('aria-selected',String(item===tab)); item.tabIndex = item===tab ? 0 : -1; });
  grid.setAttribute('aria-labelledby',tab.id);
  render(tab.dataset.stage);
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight') next=tabs[(index+1)%tabs.length];
    if(event.key==='ArrowLeft') next=tabs[(index+tabs.length-1)%tabs.length];
    if(event.key==='Home') next=tabs[0];
    if(event.key==='End') next=tabs[tabs.length-1];
    if(next){event.preventDefault(); selectTab(next);next.focus();}
  });
});
render('primary');
document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click',()=>{
  document.querySelectorAll('[data-answer]').forEach(item=>{item.classList.remove('correct','incorrect');item.setAttribute('aria-pressed',String(item===button));});
  const correct=button.dataset.answer==='3/4';
  button.classList.add(correct?'correct':'incorrect');
  document.querySelector('.practice-feedback').textContent=correct?'✓ You’ve got it! 3 out of 4 parts are shaded.':'Almost! Count the three orange parts. Try again.';
}));
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  document.querySelector('#navigation').classList.toggle('open',open);
});
document.querySelectorAll('#navigation a').forEach(link=>link.addEventListener('click',()=>{
  menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');document.querySelector('#navigation').classList.remove('open');
}));
document.querySelector('#year').textContent=new Date().getFullYear();
