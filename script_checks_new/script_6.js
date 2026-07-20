
(function(){
  const mobileTabs=['parts','labor','elite','invoice','photos','notes','details','history'];
  const labels={parts:'SEALS / PARTS',labor:'LABOR',invoice:'INVOICE',elite:'ELITE',photos:'PHOTOS',notes:'NOTES',details:'DETAILS',history:'HISTORY'};
  function isPortraitPhone(){return window.matchMedia&&window.matchMedia('(max-width:760px) and (orientation:portrait)').matches}
  function currentIndex(){let i=mobileTabs.indexOf(activeTab);return i<0?0:i}
  function goMobileTab(delta){
    if(!isPortraitPhone())return;
    autoSaveOpenJob();
    let next=Math.max(0,Math.min(mobileTabs.length-1,currentIndex()+delta));
    if(next===currentIndex())return;
    activeTab=mobileTabs[next];renderDetail();
  }
  function enhanceJobPortrait(){
    if(!isPortraitPhone())return;
    const root=document.getElementById('jobDetailContent');
    const content=document.getElementById('tabContent');
    if(!root||!content)return;
    let nav=root.querySelector('.mobile-job-swipe-nav');
    if(!nav){nav=document.createElement('div');nav.className='mobile-job-swipe-nav';root.querySelector('.tabs')?.insertAdjacentElement('afterend',nav)}
    const i=currentIndex();
    nav.innerHTML=`<button type="button" aria-label="Previous tab" ${i===0?'disabled':''}>‹</button><div class="mobile-job-tab-title"><b>${labels[activeTab]||'JOB'}</b><span>SWIPE RIGHT FOR NEXT • LEFT TO GO BACK</span></div><button type="button" aria-label="Next tab" ${i===mobileTabs.length-1?'disabled':''}>›</button>`;
    const bs=nav.querySelectorAll('button');bs[0].onclick=()=>goMobileTab(-1);bs[1].onclick=()=>goMobileTab(1);
    let sx=0,sy=0,tracking=false;
    content.ontouchstart=e=>{if(e.touches.length!==1)return;const tag=e.target.tagName;if(['INPUT','TEXTAREA','SELECT','BUTTON'].includes(tag)||e.target.closest('.seal-suggestions'))return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;tracking=true};
    content.ontouchend=e=>{if(!tracking)return;tracking=false;let dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.25)return;goMobileTab(dx>0?1:-1)};
  }
  const prior=renderDetail;
  renderDetail=function(){prior();enhanceJobPortrait()};
  window.mobileJobNext=()=>goMobileTab(1);window.mobileJobPrevious=()=>goMobileTab(-1);
  addEventListener('resize',()=>{if(document.getElementById('jobDetailModal')?.classList.contains('open'))renderDetail()});
})();
