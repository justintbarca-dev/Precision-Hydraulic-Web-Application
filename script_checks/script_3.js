
(function(){
  function completedJobs(){return jobs.filter(j=>typeof boardStatus==='function'?boardStatus(j.status)==='Completed':j.status==='Completed').sort(typeof officeBoardSort==='function'?officeBoardSort:()=>0)}
  window.renderDoneJobs=function(){
    const list=document.getElementById('doneJobsList'), label=document.getElementById('doneJobsCountLabel');if(!list)return;
    const done=completedJobs();if(label)label.textContent=done.length+' completed job'+(done.length===1?'':'s');
    list.innerHTML=done.length?done.map(j=>`<article class="done-mobile-card"><div onclick="closeDoneJobs();selectJob('${j.id}')"><h3>${esc(j.customer||'Unknown Customer')}</h3><p>${Number(j.quantity||1)} ${esc(j.jobType||'Job')}${Number(j.quantity||1)===1?'':'s'}</p></div><div class="done-mobile-actions"><div class="done-invoice-state ${j.invoiced?'invoiced':''}">${j.invoiced?'📄 INVOICED':'📄 INVOICE READY'}</div><button class="done-open-btn" onclick="closeDoneJobs();openInvoiceJob('${j.id}')">Open Invoice</button></div></article>`).join(''):'<div class="done-empty">No completed jobs yet.</div>';
  };
  window.openDoneJobs=function(){renderDoneJobs();const m=document.getElementById('doneJobsModal');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('mobile-overlay-open');document.body.style.overflow='hidden'};
  window.closeDoneJobs=function(){const m=document.getElementById('doneJobsModal');m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.classList.remove('mobile-overlay-open');document.body.style.overflow='';};
  document.getElementById('doneJobsModal')?.addEventListener('click',e=>{if(e.target.id==='doneJobsModal')closeDoneJobs()});
  function syncOverlay(){
    const open=!!document.querySelector('.job-detail-modal.open,.settings-modal.open,.invoice-modal.open,.done-jobs-modal.open');
    document.body.classList.toggle('mobile-overlay-open',open);
  }
  new MutationObserver(syncOverlay).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  const wrapRefresh=name=>{const old=window[name];if(typeof old!=='function')return;window[name]=function(){const r=old.apply(this,arguments);setTimeout(()=>{if(document.getElementById('doneJobsModal')?.classList.contains('open'))renderDoneJobs();syncOverlay()},0);return r}};
  ['markJobDone','printCurrentInvoice','render','renderBoard','openInvoiceJob'].forEach(wrapRefresh);
  document.addEventListener('DOMContentLoaded',syncOverlay);
})();
