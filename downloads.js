/* Public repository only. Never put credentials or the private source repository here. */
(function(root){
  'use strict';
  const REPO='tan318226-hub/AnoBrowser-downloads';
  const releaseBase=`https://github.com/${REPO}/releases`;
  function trustedUrl(value,download=false){
    try{const url=new URL(value);return url.protocol==='https:'&&url.hostname==='github.com'&&url.pathname.startsWith(`/${REPO}/releases/${download?'download/':''}`)&&!url.username&&!url.password;}catch{return false;}
  }
  function selectRelease(releases,platform){
    return releases.filter(r=>!r.draft&&typeof r.tag_name==='string'&&r.tag_name.startsWith(platform+'/')&&trustedUrl(r.html_url)&&Array.isArray(r.assets))
      .sort((a,b)=>Date.parse(b.published_at||0)-Date.parse(a.published_at||0))
      .map(release=>({release,asset:release.assets.find(asset=>trustedUrl(asset.browser_download_url,true)&&(platform==='windows'?/-x64-setup\.exe$/i:/_amd64\.deb$/i).test(asset.name))}))
      .find(item=>item.asset)||null;
  }
  function render(releases){
    for(const platform of ['windows','ubuntu']){
      const card=document.querySelector(`[data-platform="${platform}"]`),selected=selectRelease(releases,platform);
      if(!selected){card.querySelector('.release-status').textContent='Bộ cài chưa được đăng lên Releases.';continue;}
      const {release,asset}=selected,download=card.querySelector('[data-download]');
      download.href=asset.browser_download_url;download.textContent=`Tải ${platform==='windows'?'bộ cài .exe':'gói .deb'} ↓`;
      card.querySelector('.release-status').textContent=`${release.tag_name.replace(platform+'/v','')} · ${(asset.size/1024/1024).toFixed(0)} MB`;
      card.querySelector('[data-notes]').href=release.html_url;
      const checksum=release.assets.find(a=>(a.name===asset.name+'.sha256'||a.name==='SHA256SUMS')&&trustedUrl(a.browser_download_url,true));
      if(checksum){const link=card.querySelector('[data-checksum]');link.href=checksum.browser_download_url;link.hidden=false;}
    }
  }
  async function load(){
    try{
      const releases=[];
      for(let page=1;page<=3;page++){
        const response=await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(8000)});
        if(!response.ok)throw Error(`Release API ${response.status}`);
        const items=await response.json();if(!Array.isArray(items))throw Error('Invalid release list');releases.push(...items);if(items.length<100)break;
      }
      render(releases);
    }catch{
      for(const status of document.querySelectorAll('[data-platform] .release-status'))status.textContent='Xem bộ cài trực tiếp trên GitHub Releases.';
    }
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={selectRelease,trustedUrl};
  if(typeof document!=='undefined')load();
})(typeof window==='undefined'?globalThis:window);
