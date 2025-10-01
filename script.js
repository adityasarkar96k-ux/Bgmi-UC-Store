javascript
packsArea.style.display = 'block';
renderPacks();
sessionStorage.setItem('bgmi-uid', uid);
});


packsList.addEventListener('click', e=>{
const btn = e.target.closest('button[data-id]');
if(!btn) return;
const pid = Number(btn.getAttribute('data-id'));
const pack = packs.find(p=>p.id===pid);
openPaymentModal(pack);
});


function openPaymentModal(pack){
modal.style.display='flex';
document.getElementById('modalTitle').textContent = `Pay ₹${pack.price} for ${pack.uc} UC`;
qrArea.style.display='none';
thankArea.style.display='none';
qrImage.src = 'qr-placeholder.svg';
sessionStorage.setItem('bgmi-pack', JSON.stringify(pack));
}


document.getElementById('closeModal').addEventListener('click', ()=>{modal.style.display='none'});


document.querySelectorAll('.pay-btn').forEach(b=>{
b.addEventListener('click', ()=>{
qrImage.src = 'qr-placeholder.svg'; // replace with real QR
qrArea.style.display='block';
startCountdown(5*60);
});
});


let countdownTimer=null;
function startCountdown(sec){
clearInterval(countdownTimer);
let remaining = sec;
updateCountdown(remaining);
countdownTimer = setInterval(()=>{
remaining--;
if(remaining<=0){clearInterval(countdownTimer);showThankYou();}
else updateCountdown(remaining);
},1000);
}
function updateCountdown(remaining){
const m = Math.floor(remaining/60);
const s = remaining%60;
countdownEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}


document.getElementById('paidBtn').addEventListener('click', ()=>{
clearInterval(countdownTimer); showThankYou();
});
document.getElementById('cancelPay').addEventListener('click', ()=>{modal.style.display='none';clearInterval(countdownTimer)});


function showThankYou(){
qrArea.style.display='none';
thankArea.style.display='block';
const pack = JSON.parse(sessionStorage.getItem('bgmi-pack')||'null');
const id = 'ORD'+Date.now().toString().slice(-6);
orderId.textContent = id + ' • ' + (pack?(`${pack.uc} UC`):'');
document.getElementById('modalSub').textContent = 'Thank you for purchase — your delivery will happen within 24 hr.';
}


const savedUid = sessionStorage.getItem('bgmi-uid');
if(savedUid){uidInput.value=savedUid; uidBtn.click();}
```
