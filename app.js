
import { DEMO_PRODUCTS } from './data.js';

const cart = JSON.parse(localStorage.getItem('cart')||'[]');
const member = JSON.parse(localStorage.getItem('member')||'null');

function saveCart(){localStorage.setItem('cart',JSON.stringify(cart));}
function $(q){return document.querySelector(q);}

window.renderProducts = function(listId, filter){
 const box = document.getElementById(listId);
 box.innerHTML='';
 DEMO_PRODUCTS.filter(p=>!filter||p.category===filter).forEach(p=>{
  const d=document.createElement('div');
  d.className='card';
  d.innerHTML=`
    <img src="${p.images[0]}">
    <h4>${p.title}</h4>
    <div class="price">NT$ ${p.price}</div>
    <button>加入購物車</button>`;
  d.querySelector('button').onclick=()=>{
    cart.push({...p,qty:1});
    saveCart(); alert('已加入購物車');
  };
  box.appendChild(d);
 });
}

window.renderCart = function(){
 const box=$('#cartBox'); let sum=0;
 box.innerHTML='';
 cart.forEach(c=>{
  sum+=c.price*c.qty;
  box.innerHTML+=`<div>${c.title} x${c.qty} NT$${c.price}</div>`;
 });
 $('#total').innerText=sum;
}

window.loginDemo = function(){
 const phone=$('#phone').value;
 localStorage.setItem('member',JSON.stringify({phone,name:'十年一日會員',birth_m:new Date().getMonth()+1}));
 location.href='member.html';
}

window.onload=()=>{
 if($('#productGrid')) renderProducts('productGrid',document.body.dataset.cat);
 if($('#cartBox')) renderCart();
 if(member && $('#memberName')){
   $('#memberName').innerText=member.name+(member.birth_m===new Date().getMonth()+1?' 🎂':'');
 }
}
