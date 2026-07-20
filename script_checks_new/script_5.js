
(function(){
  function mobileTitle(){
    if(innerWidth>760)return;
    let t=document.querySelector('.mobile-view-title');
    if(!t){t=document.createElement('div');t.className='mobile-view-title';t.innerHTML='<span>Precision Hydraulic</span><span style="font-size:11px;color:#8fa9bd">SHOP APP</span>';document.querySelector('.main')?.prepend(t)}
  }
  addEventListener('DOMContentLoaded',mobileTitle);addEventListener('resize',mobileTitle);
})();
