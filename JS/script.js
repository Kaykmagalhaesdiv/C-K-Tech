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

let imgBody = document.getElementById('img-hidden');
let imgFirstPage = document.getElementById('img-hidden-first')


let obj = [
  {
    codigo: '1',
    produto: 'Hamburguer',
    preco : 15
  },
  {
    codigo: '2',
    produto: 'Pao e manteiga',
    preco : 20
  },
];

let arrProductClient = [];

let tradePage = () => {
  firstPage.setAttribute("hidden", "true");
  secondPage.removeAttribute("hidden");
};

let findProduct = () =>{
  let valueInput = inputFindProduct.value;
  
  let findObj = obj.filter((value) =>{
    let valueCode = value.codigo;
    if(valueInput == ''){
      return false
    };
    return valueCode.indexOf(valueInput) != -1;
  });

  let arrSum = findObj.map((value) =>{
    let totalySum = inputQuantidade.value * value.preco;
    return totalySum;
  });

  if(findObj.length == 0 || inputQuantidade.value == '' || inputQuantidade.value <= 0 || inputFindProduct.value == ''){
    alert('Por favor, verifique o código do produto ou Quantidade estão corretos.');
  }else{
    inputProduct.value = findObj[0].produto;
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
  let type = document.querySelector('input[name="option"]:checked').value                    
  arrProductClient.push({
  codigo: inputFindProduct.value,
  produto: inputProduct.value,
  quantidade: inputQuantidade.value,
  preco: parseInt(inputPreco.value),
  tipo: type
  });

  console.log(arrProductClient)

  inputFindProduct.value = ''
  inputProduct.value = ''
  inputQuantidade.value = ''
  inputPreco.value =  ''


  let filterPrice = arrProductClient.map((valor) =>{
    return valor.preco
  })

  let totalSum = filterPrice.reduce((total,next) =>{
    return total += next;
  })

  let resultPrice = document.getElementById('result')
  resultPrice.removeAttribute('hidden')
  resultPrice.innerHTML = `<h4>
                            Total do pedido: <strong>R$ ${totalSum}</strong:
                          </h4>`;

  btnSave.removeAttribute('class', 'btn-save-inactive');
  btnSave.setAttribute('class','btn-save btn-config btn-save-active')
  

  if(inputFindProduct.value == '' || inputQuantidade.value  == ''){
    btnAddProduct.removeAttribute('class', 'btn-active');
    btnAddProduct.setAttribute('class', 'btn-inactive btn-save-product btn-config mt-3')
    btnAddProduct.setAttribute('disabled','true');
  }
  return false
  // arrProductClient.forEach((element) => {

  // })
};

let saveProduct = () =>{
  secondPage.setAttribute('hidden','true')
  firstPage.removeAttribute('hidden');

  imgFirstPage.setAttribute('hidden','true')

arrProductClient.forEach((element) =>{
  tableBodyStatus.innerHTML += `<tr>
                                <td> <input type="radio"/> 88888
                                </td>
                                <td>${element.quantidade} - ${element.produto}</td>
                                <td>${element.tipo}</td>
                                <td>R$ ${element.preco.toFixed(2)}</td>
                              </tr>`
})
  
}



btnNewRequest.addEventListener("click", tradePage);
btnFind.addEventListener("click", findProduct);
btnAddProduct.addEventListener("click", productTable)
btnSave.addEventListener('click',saveProduct)
