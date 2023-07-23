// Elements from HTML 
const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.querySelector('#add-btn');
const listArea = document.getElementById('list');
const statusCheckbox = document.getElementById('status-check');
const sumInfo = document.getElementById('sum-info');
const deleteBtn = document.getElementById('delete');
const userInput = document.getElementById('user-input');
const select = document.querySelector('select');

//! izlediğimiz olaylar
addBtn.addEventListener('click',addExpense);
listArea.addEventListener('click', handleUpdate);
userInput.addEventListener('input', saveUser);
document.addEventListener('DOMContentLoaded', getUser);
select.addEventListener('change', handleFilter);

// toplamın değeri 
let sum = 0;

function updateSum(price) {
  // js'deki toplam değerini günceller
  sum += Number(price);

  //html'deki toplam bilgi alanını güncelleme
  sumInfo.innerText = sum;
}

// eventListener ile çalıştırılan fonksiyonlarda 
// olay hakkında bilgileri içeren bir parametre gider
function addExpense(event){
    //sayfanın yenilenmesini engelleme
    event.preventDefault();

//!inputların biri bile boşsa alert ver ve fonksiyonu durdur
if (!nameInput.value || !priceInput.value) {
    alert('Please fill in the form...');
    return;
  }

//!inputlar doluysa kart oluştur ve html'e gönder
//a. div oluşturma
const expenseDiv = document.createElement('div');

//b. div'e class ekleme
expenseDiv.classList.add('expense');

 //eğer ödendi checbox'ına tıklandıysa ödendi class'ı ekle
 if (statusCheckbox.checked === true) {
    expenseDiv.classList.add('paid');
  }

//c. içerisinde HTML'i belirleme
expenseDiv.innerHTML = `
    <h2 class="name">${nameInput.value}</h2>
    <h2 class="price">${priceInput.value}</h2>
    <div class="btns">
        <img id="edit" src="/images/pay-icon.png" />
        <img id="delete" src="/images/delete-icon.png" />
    </div>
`;

//d. oluşan elemanı html'e gönderme
listArea.appendChild(expenseDiv);

// toplam alanını güncelleme
updateSum(priceInput.value);

// formu temizleme
nameInput.value = '';
priceInput.value = '';
statusCheckbox.checked = false;

console.log(listArea);
}

// listedeki bir elemana tıklayınca çalışır
function handleUpdate(event) {
    // tıklanılan elemana erişme
    const ele = event.target;
    // silme resminin kapsayıcısına erişme
    const parent = ele.parentElement.parentElement;
  
    // yalnızca silme resmine tıklanınca çalışacak kod
    if (ele.id === 'delete') {
      // elementi silme
      parent.remove();
  
      // toplam bilgisini güncelleme
      const price = parent.querySelector('.price').textContent;
      updateSum(Number(price) * -1);
    }
  
    // tıklanan elemanın id'si edit ise harcamanın  paid classı varsa çıkar yoksa ekle
    if (ele.id === 'edit') {
      parent.classList.toggle('paid');
    }
}

// kullanıcıyı local'a kaydetme
function saveUser(event) {
    localStorage.setItem('username', event.target.value);
  }
  
  // kullanıcı local'de varsa onu alma
  function getUser() {
    // local'den ismi al | isim yoksa null yerine "" olsun
    const username = localStorage.getItem('username') || '';
  
    // kullanıcı ismini inputa aktar
    userInput.value = username;
  }

// filtreleme alanı
function handleFilter(event) {
    const selected = event.target.value;
    const items = list.childNodes;

// bütün elemanları dönme
items.forEach((item) => {
    // selected alabileceği değerleri izleme
    switch (selected) {
      case 'all':
        // hepsini göster
        item.style.display = 'flex';
        break;

      case 'paid':
        //  eleman paid class'ına sahipse onu göster, değilse gizle
        if (item.classList.contains('paid')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;

      case 'unpaid':
        //  eleman paid class'ına sahip değilse onu göster, değilse gizle
        if (!item.classList.contains('paid')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
    }
  });
}