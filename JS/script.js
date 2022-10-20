let firstPage = document.getElementById("requests");
let secondPage= document.getElementById("newRequest");

let btnNewRequest = document.getElementById("btn-novo-pedido");
let btnFind = document.getElementById('btn-find')
let btnAddProduct = document.getElementById('btn-add');
let btnSave = document.getElementById('btn-save-id')

let inputQuantidade = document.getElementById("amount-product");
let inputProduct = document.getElementById("name-product");
let inputPreco = document.getElementById("price-product");
let inputFindProduct = document.getElementById('codeProduct')

let tableBody = document.getElementById('table-body')
let tableBodyStatus = document.getElementById('table-body-result');
let resultPrice = document.getElementById('result')

let imgBody = document.getElementById('img-hidden');
let imgFirstPage = document.getElementById('img-hidden-first')


let product = [
  {
    code: '1001',
    productFood: 'Super SMACH COMBO Programado – Hambúrguer + Fritas',
    price : 55
  },
  {
    code: '1002',
    productFood: 'SMACH VariavelBurguer – Hambúrguer com bacon',
    price : 45
  },
  {
    code: '1003',
    productFood: 'SMACH BUG EM PROD – Hambúrguer meio torto',
    price : 25
  },
  {
    code: '1004',
    productFood: 'Combo Econômico SMACH Char 1 – Pão com Carne',
    price : 15
  },
  {
    code: '1005',
    productFood: 'Especial SMACH CSS – Hambúrguer colorido e alinhado',
    price : 65
  },
  {
    code: '2001',
    productFood: 'Refrigerante 350 ml',
    price : 8
  },
  {
    code: '2002',
    productFood: 'Água 500 ml',
    price : 5
  },
  {
    code: '2003',
    productFood: 'SMACH VariavelBurguer – Hambúrguer com bacon',
    price : 7
  },
  {
    code: '3001',
    productFood: 'Sorvete 300 ml',
    price : 15
  },
  {
    code: '3002',
    productFood: 'Sobremesa doce SMACH ARRAY',
    price : 50
  },
];

let arrProductClient = [];

let tradePage = () => {
  firstPage.setAttribute("hidden", "true");
  secondPage.removeAttribute("hidden");
  resultPrice.setAttribute('hidden','true')
  
  tableBodyStatus.innerHTML = ''
  inputFindProduct.value = '';
  tableBody.innerHTML = '';
  
  arrProductClient.splice(0,arrProductClient.length)
};

let findProduct = () =>{
  let valueInput = inputFindProduct.value;
  if(valueInput.length < 4){
    alert("Por favor digite apenas 4 numeros para o codigo")
    return false;
  }
  
  let findObj = product.filter((value) =>{
    let valueCode = value.code;
    if(valueInput == ''){
      return false
    };
    return valueCode.indexOf(valueInput) != -1;
  });

  let arrSum = findObj.map((value) =>{
    let totalySum = inputQuantidade.value * value.price;
    return totalySum;
  });

  if(findObj.length == 0 || inputQuantidade.value == '' || inputQuantidade.value <= 0 || inputFindProduct.value == ''){
    alert('Por favor, verifique o código do produto ou Quantidade estão corretos.');
  }else{
    inputProduct.value = findObj[0].productFood;
    inputPreco.value = arrSum[0].toFixed(2);
    btnAddProduct.removeAttribute('class', 'btn-inactive');
    btnAddProduct.removeAttribute('disabled','true')
    btnAddProduct.setAttribute('class', 'btn-active btn-save-product btn-config mt-3')
  }
};

let productTable = () =>{
  imgBody.setAttribute('hidden','true')
  tableBody.innerHTML += `<tr>
                          <td>${inputFindProduct.value}</td>
                          <td>${inputProduct.value}</td>
                          <td>${inputQuantidade.value}</td>
                          <td>R$ ${inputPreco.value}</td>
                        </tr>`
  let status = document.querySelector('input[name="option"]:checked').value                    
  arrProductClient.push({
  cod: inputFindProduct.value,
  productName: inputProduct.value,
  qty: inputQuantidade.value, 
  price: parseInt(inputPreco.value),
  type: status
  });

  inputFindProduct.value = ''
  inputProduct.value = ''
  inputQuantidade.value = ''
  inputPreco.value =  ''

  let filterPrice = arrProductClient.map((valor) =>{
    return valor.price
  })

  let totalSum = filterPrice.reduce((total,next) =>{
    return total += next;
  })
  resultPrice.removeAttribute('hidden')
  resultPrice.innerHTML = `<h4>
                            Total do pedido: <strong>R$ ${totalSum.toFixed(2)}</strong:
                          </h4>`;

  btnSave.removeAttribute('class', 'btn-save-inactive');
  btnSave.setAttribute('class','btn-save btn-config btn-save-active')
  

  if(inputFindProduct.value == '' || inputQuantidade.value  == ''){
    btnAddProduct.removeAttribute('class', 'btn-active');
    btnAddProduct.setAttribute('class', 'btn-inactive btn-save-product btn-config mt-3')
    btnAddProduct.setAttribute('disabled','true');
  }
  return false
};

if(inputQuantidade.value == '' || inputQuantidade.value <= 0 || inputFindProduct.value == ''){
  btnAddProduct.removeAttribute('class', 'btn-active')
  btnAddProduct.setAttribute('class','btn-inactive btn-save-product btn-config mt-3')
};

let saveProduct = () =>{
  secondPage.setAttribute('hidden','true')
  firstPage.removeAttribute('hidden');

  imgFirstPage.setAttribute('hidden','true')
  
  
let count = 0;
arrProductClient.forEach((element,index) =>{
  tableBodyStatus.innerHTML += `<tr>
                                <td> <input type="radio"/> ${index + 1}
                                </td>
                                <td>${element.qty} - ${element.productName}</td>
                                <td>${element.type}</td>
                                <td>R$ ${element.price.toFixed(2)}</td>
                                <td><button id="order-${index + 1}" class="btn-config ready" value="recebido">Pronto</button></td>
                              </tr>`

const btnStatus = document.getElementById(`order-${index + 1}`);
btnStatus.addEventListener('click', () =>{ console.log(`vou mudar ${index + 1}`)} )
})
};



btnNewRequest.addEventListener("click", tradePage);
btnFind.addEventListener("click", findProduct);
btnAddProduct.addEventListener("click", productTable)
btnSave.addEventListener('click',saveProduct)
