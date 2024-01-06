// document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.order__wrap-title').addEventListener('click', () => {
      document.querySelector('.order').classList.toggle('order_open')
  })
  // let request = new XMLHttpRequest();
  // request.open('GET', 'db.json', true);
  fetch('/db.json')
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error(response.statusText || response.status)
    })
    .then((data) => {
      const navigationButtons = document.querySelectorAll('.navigation__button');
      const catalog = document.querySelector('.catalog__list');
      const modal = document.querySelector('.modal');
      const modalTitle = document.querySelector('.modal-product__title');
      const modalImage = document.querySelector('.modal-product__image');
      const modalProductDescription = document.querySelector('.modal-product__description');
      const ingredientsList = document.querySelector('.ingredients');
      const closeButton = document.querySelector('.modal__close');

      catalog.addEventListener('click', (event) => {
        console.log('Catalog clicked');
        if (event.target.classList.contains('product__add')) {
          const product = event.target.closest('.product')
          if (product?.dataset?.id) {
            console.log(product?.dataset?.id);
            const productData = data.find(p => p.id === product?.dataset?.id)
            const title = productData.title   
            const weight = productData.weight 
            const price = productData.price   
                    
            const item = document.createElement('li');
            item.classList.add('order__item');        
            
            item.innerHTML = `
              <img class="order__image" src="${productData.image}" alt="">
              <div class="order__product">
                <h3 class="order__product-title">${title}</h3>
                <p class="order__product-weight">${weight}</p>
                <p class="order__product-price">${price}<span class="currency">₽</span></p>
              </div>
              <div class="order__product-count count">
                <button class="count__minus">-</button>
                <p class="count__amount">1</p>
                <button class="count__plus">+</button>
              </div>
            `;
        
            orderList.appendChild(item);
          }          
        }
      })
      
      const orderList = document.querySelector('.order__list');
    
      function showProducts(category) {
        catalog.innerHTML = '';
    
        const filteredProducts = data.filter(item => item.category === category);
    
        filteredProducts.forEach(product => {
          const li = document.createElement('li');
          li.classList.add('catalog__item');
    
          const article = document.createElement('article');
          article.classList.add('product');
          article.dataset.id = product.id
    
          const img = document.createElement('img');
          img.classList.add('product__image');
          img.src = product.image;
          img.alt = product.title;
          article.appendChild(img);
    
          const price = document.createElement('p');
          price.classList.add('product__price');
          price.textContent = product.price;
          const currency = document.createElement('span');
          currency.classList.add('currency');
          currency.textContent = '₽';
          price.appendChild(currency);
          article.appendChild(price);
    
          const title = document.createElement('h3');
          title.classList.add('product__title');
          const detailButton = document.createElement('button');
          detailButton.classList.add('product__detail');
          detailButton.textContent = product.title;
          title.appendChild(detailButton);
          article.appendChild(title);
    
          const weight = document.createElement('p');
          weight.classList.add('product__weight');
          weight.textContent = product.weight + 'г';
          article.appendChild(weight);
    
          const addButton = document.createElement('button');
          addButton.classList.add('product__add');
          addButton.setAttribute('type', 'button');
          addButton.textContent = 'Добавить';
          article.appendChild(addButton);
    
          li.appendChild(article);
          catalog.appendChild(li);
    
          img.addEventListener('click', () => {
            modalTitle.textContent = product.title;
            modalImage.src = product.image;
    
            modalProductDescription.textContent = product.description;
    
            ingredientsList.innerHTML = '';
            product.ingredients.forEach(ingredient => {
              const li = document.createElement('li');
              li.classList.add('ingredients__items');
              li.textContent = ingredient;
              ingredientsList.appendChild(li);
            });
            
            modal.classList.add('modal_open');
          });
        });
      }
    
      const defaultCategory = 'burger'; 
      showProducts(defaultCategory);
      
      navigationButtons.forEach(button => {
        button.addEventListener('click', () => {
          navigationButtons.forEach(btn => {
            btn.classList.remove('navigation__button_active');
          });
    
          button.classList.add('navigation__button_active');
    
    
          const category = button.parentNode.dataset.category;
          showProducts(category);
    
          const categoryTitle = document.getElementById('categoryTitle');
          categoryTitle.textContent = button.textContent;
        });
      });
    
      closeButton.addEventListener('click', () => {
        modal.classList.remove('modal_open');
      });
    
      document.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.classList.remove('modal_open');
        }
      });


      // const addToCartButtons = document.querySelectorAll('.product__add');
      // addToCartButtons.forEach((button) => {
      //   button.addEventListener('click', () => {
          
      //     const card = button.closest('.product');
      //     const title = card.querySelector('.product__title button').textContent;
      //     const weight = card.querySelector('.product__weight').textContent;
      //     const price = parseFloat(card.querySelector('.product__price').textContent);
      
          
      //     const item = document.createElement('li');
      //     item.classList.add('order__item');
      
          
      //     item.innerHTML = `
      //       <img class="order__image" src="img/burger-1-1.jpg" alt="Супер сырный">
      //       <div class="order__product">
      //         <h3 class="order__product-title">${title}</h3>
      //         <p class="order__product-weight">${weight}</p>
      //         <p class="order__product-price">${price}<span class="currency">₽</span></p>
      //       </div>
      //       <div class="order__product-count count">
      //         <button class="count__minus">-</button>
      //         <p class="count__amount">1</p>
      //         <button class="count__plus">+</button>
      //       </div>
      //     `;
      
      //     orderList.appendChild(item);
      //   });
      // });
    })
    .catch((error) => {
      console.error(error)
    })

// });


// const buttons = document.querySelectorAll('.navigation__button');

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     // Удаляем класс у всех кнопок
//     buttons.forEach(btn => {
//       btn.classList.remove('navigation__button_active');
//     });

//     // Добавляем класс на активную кнопку
//     button.classList.add('navigation__button_active');
//   });
// });

// function fetchData() {
//   fetch('db.json') 
//     .then(response => response.json())
//     .then(data => {
//       updateUI(data);
//     })
//     .catch(error => console.error('Ошибка при загрузке данных:', error));
// }

// function updateUI(data) {
//   let container = document.getElementById('dataContainer');
//   container.innerHTML = '';

//   data.forEach(function(item) {
//     let article = document.createElement('article');
//   article.classList.add('product');

  
//   let img = document.createElement('img');
//   img.classList.add('product__image');
//   img.src = item.image;
//   img.alt = item.title;
//   article.appendChild(img);

  
//   let price = document.createElement('p');
//   price.classList.add('product__price');
//   price.textContent = item.price + '₽';
//   article.appendChild(price);

  
//   let title = document.createElement('h3');
//   title.classList.add('product__title');
//   let detailButton = document.createElement('button');
//   detailButton.classList.add('product__detail');
//   detailButton.textContent = item.title;
//   title.appendChild(detailButton);
//   article.appendChild(title);

  
//   let weight = document.createElement('p');
//   weight.classList.add('product__weight');
//   weight.textContent = item.weight + 'г';
//   article.appendChild(weight);

  
//   let addButton = document.createElement('button');
//   addButton.classList.add('product__add');
//   addButton.type = 'button';
//   addButton.textContent = 'Добавить';
//   article.appendChild(addButton);

  
//   container.appendChild(article);
//   });
// }

// let request = new XMLHttpRequest();
// request.open('GET', 'db.json', true);
// request.onreadystatechange = function() {
//   if (request.readyState === 4 && request.status === 200) {
//     let data = JSON.parse(request.responseText);
    
//     console.log(data);

//     data.forEach(item => {
      
//     });
//   }
// };
// request.send();