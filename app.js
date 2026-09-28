const KEY='stackdome_wg_clients';
const APIKEY='stackdome_wg_api';
let clients=JSON.parse(localStorage.getItem(KEY)||'[]');

const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(clients)); render();}
function render(){
  const q=$('search').value.trim().toLowerCase();
  const list=clients.filter(x=>(x.name+x.address).toLowerCase().includes(q));
  $('total').textContent=clients.length;
  $('active').textContent=clients.filter(x=>x.active).length;
  $('traffic').textContent=clients.reduce((n,x)=>n+(x.rx||0)+(x.tx||0),0)+' B';
  $('empty').style.display=list.length?'none':'block';
  $('clients').innerHTML=list.map(x=>`
    <article class="client">
      <div><strong>${esc(x.name)}</strong><div class="muted">${esc(x.address)} · DNS ${esc(x.dns)}</div>
      <div class="muted">${x.active?'● فعال':'○ غیرفعال'} · ${esc(x.endpoint||'بدون endpoint')}</div></div>
      <div class="actions">
        <button onclick="toggle('${x.id}')">${x.active?'خاموش':'روشن'}</button>
        <button onclick="downloadConf('${x.id}')">کانفیگ</button>
        <button onclick="removeClient('${x.id}')">حذف</button>
      </div>
    </article>`).join('');
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
window.toggle=id=>{let x=clients.find(x=>x.id===id); if(x){x.active=!x.active;save()}};
window.removeClient=id=>{if(confirm('این کلاینت حذف شود؟')){clients=clients.filter(x=>x.id!==id);save()}};
window.downloadConf=id=>{
  const x=clients.find(x=>x.id===id); if(!x)return;
  const conf=`[Interface]\nPrivateKey = <GENERATE_ON_SERVER>\nAddress = ${x.address}\nDNS = ${x.dns}\n\n[Peer]\nPublicKey = <SERVER_PUBLIC_KEY>\nAllowedIPs = 0.0.0.0/0, ::/0\nEndpoint = ${x.endpoint||'<SERVER:51820>'}\nPersistentKeepalive = 25\n`;
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([conf],{type:'text/plain'}));a.download=x.name.replace(/[^a-z0-9_-]/gi,'_')+'.conf';a.click();URL.revokeObjectURL(a.href);
};
$('addBtn').onclick=()=>$('modal').showModal();
$('closeBtn').onclick=()=>$('modal').close();
$('clientForm').onsubmit=e=>{e.preventDefault();clients.push({id:crypto.randomUUID(),name:$('name').value,address:$('address').value,dns:$('dns').value,endpoint:$('endpoint').value,active:false,rx:0,tx:0});save();e.target.reset();$('dns').value='1.1.1.1';$('modal').close()};
$('search').oninput=render;
$('saveApi').onclick=()=>{localStorage.setItem(APIKEY,$('apiBase').value.trim());$('apiStatus').textContent='آدرس API در مرورگر ذخیره شد.'};
$('apiBase').value=localStorage.getItem(APIKEY)||'';
render();
