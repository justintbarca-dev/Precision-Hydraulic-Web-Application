
(function(){
  function setMobileActive(id){document.querySelectorAll('#mobileBottomNav button').forEach(b=>b.classList.remove('active'));document.getElementById(id)?.classList.add('active')}
  window.mobileGo=function(view){
    if(view==='jobs'){setMobileActive('mJobs');if(typeof showDashboardView==='function')showDashboardView();if(typeof clearFilter==='function')clearFilter()}
    else if(view==='done'){setMobileActive('mDone');if(typeof openDoneJobs==='function')openDoneJobs()}
    else if(view==='elite'){setMobileActive('mElite');if(typeof openEliteView==='function')openEliteView('all')}
    else if(view==='office'){setMobileActive('mMore');if(typeof openOfficeBoard==='function')openOfficeBoard()}
    else if(view==='more'){setMobileActive('mMore');if(typeof openSettingsWindow==='function')openSettingsWindow()}
  };
  const wrap=(name,id)=>{const old=window[name];if(typeof old!=='function')return;window[name]=function(){const r=old.apply(this,arguments);setTimeout(()=>setMobileActive(id),0);return r}};
  wrap('showDashboardView','mJobs');wrap('openDoneJobs','mDone');wrap('openEliteView','mElite');wrap('openOfficeBoard','mMore');wrap('openSettingsWindow','mMore');
  document.addEventListener('touchstart',function(){},{passive:true});
  document.addEventListener('DOMContentLoaded',()=>{
    document.documentElement.classList.add('iphone-test-edition');
    const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content','#07121d');
    let apple=document.querySelector('meta[name="apple-mobile-web-app-capable"]');if(!apple){apple=document.createElement('meta');apple.name='apple-mobile-web-app-capable';apple.content='yes';document.head.appendChild(apple)}
    let status=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');if(!status){status=document.createElement('meta');status.name='apple-mobile-web-app-status-bar-style';status.content='black-translucent';document.head.appendChild(status)}
    let title=document.querySelector('meta[name="apple-mobile-web-app-title"]');if(!title){title=document.createElement('meta');title.name='apple-mobile-web-app-title';title.content='Precision Hydraulic';document.head.appendChild(title)}
  });
})();
