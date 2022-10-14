let aa =  document.getElementById('requests');
let bb = document.getElementById('newRequest');
let btn = document.getElementById('btn-novo-pedido');

let tradePage = () =>{
    aa.setAttribute('hidden', 'true')
    bb.removeAttribute('hidden')
};

btn.addEventListener('click',tradePage)