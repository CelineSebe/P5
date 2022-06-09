
// Récupération du panier de produit LS
let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));

//Mise en place de l'Api

 fetch('http://localhost:3000/api/products/')
    .then(function(response) {
      if (response.ok){
        return response.json();
      }
    })
     //2ème promesse: obtenir l'objet JS
    .then(function displayBasket() {
        
        deleteProduct();
        costTotal();
        changeBasket();
        // formulaire();
    })  

    // Si l'API ne répond pas
    // .catch(function(err) {
    //  const empty = document.querySelector("#cart_setting").innerHTML = "<h1>Votre panier est vide</h1>";
    //  const inaccessible = document.createElement("p").innerText = "Toutes nos excuses, la base de données est inaccessible, revenir plus tard";
    //  empty.appendChild(inaccessible);
    // });

/*******------------- Affichage du panier - Fonction pour l'affichage du panier -------------*****************/
displayBasket();

function displayBasket(){
    const positionProduct = document.getElementById("cart__items");
      //si le localstorage est vide
    if (!productInLocalStorage || productInLocalStorage.length === null || productInLocalStorage.length === 0) {
      positionProduct.innerHTML = "Votre panier est vide";
      const returnHome = document.createElement("p");
      returnHome.innerText = "Vous pouvez retrouver notre gamme d'articles à l'accueil :)";
      positionProduct.appendChild(returnHome);
      positionProduct.style.fontSize = "20px";
      positionProduct.style.textAlign = "center"; 
       

      /************_______ OLD METHOD Template_______*****************/
      // let structureBasket = [];
      // //si le localstorage n'est pas vide
      // for (j = 0; j < productInLocalStorage.length; j++){
      //     structureBasket = structureBasket + `
      //     <article class="cart__item" data-id="${productInLocalStorage[j]._id}" data-color="${productInLocalStorage[j].colors}">
      //       <div class="cart__item__img">
      //         <img src="${productInLocalStorage[j].image}" alt="${productInLocalStorage[j].altTxt}">
      //       </div>
      //       <div class="cart__item__content">
      //         <div class="cart__item__content__description">
      //           <h2>${productInLocalStorage[j].name}</h2>
      //             <p>${productInLocalStorage[j].color}</p>
      //             <p>${productInLocalStorage[j].price}€</p>
      //         </div>
      //         <div class="cart__item__content__settings">
      //           <div class="cart__item__content__settings__quantity">
      //             <p>Qté : </p>
      //             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}">
      //           </div>
      //           <div class="cart__item__content__settings__delete">
      //             <p class="deleteItem">Supprimer</p>
      //           </div>
      //         </div>
      //       </div>
      //     </article> `
      //           ;

      //     }
      // if (j === productInLocalStorage.length){
      //   document.getElementById("cart_items");
      //   positionProduct.innerHTML = structureBasket;
      // }
      /**************__________Construction Cart DOM____________*******/
    }else{
        this.structureBasket = [];
        //si le localstorage n'est pas vide
        if (productInLocalStorage){
        for (let cart in productInLocalStorage){
          
          // Création des éléments constituant le panier
          let cart__item = document.createElement("article");
          document.getElementById("cart__items").appendChild(cart__item);
          cart__item.classList.add("cart__item");

          let cart__item__img = document.createElement("div");
          cart__item.appendChild(cart__item__img);
          cart__item__img.classList.add("cart__item__img");
          
          let img = document.createElement("img");
          cart__item__img.appendChild(img);
          img.src = productInLocalStorage[cart].image;
          img.alt = "Photographie d'un canapé";

          let cart__item__content = document.createElement("div");
          cart__item.appendChild(cart__item__content);
          cart__item__content.classList.add("cart__item__content")

          let cart__item__content__description = document.createElement("div");
          cart__item__content.appendChild(cart__item__content__description);
          cart__item__content__description.classList.add("cart__item__content__description")

          let cart__title = document.createElement("h2");
          cart__item__content__description.appendChild(cart__title);
          cart__title.innerHTML =productInLocalStorage[cart].name;

          let paragraphe__color = document.createElement("p");
          cart__title.appendChild(paragraphe__color);
          paragraphe__color.innerHTML = productInLocalStorage[cart].color;

          let paragraphe__price = document.createElement("p");
          cart__title.appendChild(paragraphe__price);
          paragraphe__price.innerHTML = productInLocalStorage[cart].price + '€';

          let cart__item__content__settings = document.createElement("div");
          cart__item__content.appendChild(cart__item__content__settings);
          cart__item__content__settings.classList.add("cart__item__content__settings");

          let cart__item__content__settings__quantity = document.createElement("div");
          cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
          cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");

          let paragraphe__qty = document.createElement("p");
          cart__item__content__settings__quantity.appendChild(paragraphe__qty);
          paragraphe__qty.innerHTML = `Qté : `;

          let cartInput = document.createElement("input");
          cart__item__content__settings__quantity.appendChild(cartInput);
          cartInput.classList.add("itemQuantity");
          cartInput.type = "number";
          cartInput.name = "itemQuantity";
          cartInput.min = "1";
          cartInput.max = "100";
          cartInput.dataset.idElement = productInLocalStorage[cart]._id;
          cartInput.dataset.color = productInLocalStorage[cart].color;
          cartInput.value = productInLocalStorage[cart].quantity;

          let cart__item__content__settings__delete = document.createElement("div");
          cart__item__content__settings__quantity.appendChild(cart__item__content__settings__delete);
          cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

          let deleteItem = document.createElement("p");
          cart__item__content__settings__delete.appendChild(deleteItem);
          deleteItem.innerText = `Supprimer`;
          deleteItem.dataset._idElement = productInLocalStorage[cart]._id;
          deleteItem.dataset.color = productInLocalStorage[cart].color;
          deleteItem.classList.add("deleteItem");
          
          // Gestion des quantités à afficher
            let totalQuantity = document.querySelector("#totalQuantity");
            let totalPrice = document.querySelector("#totalPrice");
            let quantity = parseInt(cartInput.value, 10);
            }
      }
    }
  
/***************** ------------ Supprimer l'article ---------************************************************/


function deleteProduct(){

const deleteProd = document.querySelectorAll(".deleteItem");

// selection du produit supprimé en cliquant sur le texte "supprimer"
deleteProd.forEach(element => {
element.addEventListener("click",(e) => {
  e.preventDefault();
  color_delete = element.dataset.color;

  //methode filter pour ne pas sortir de la variable les élements qui ont une couleur différente
  productInLocalStorage = productInLocalStorage.filter(element => element.color !== color_delete);
  console.log(productInLocalStorage);
  // envoi de la variable LS
  localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
  alert("Ce produit vient d'être supprimé")
  window.location.href = "cart.html";
  })
})

/************************ ------- Vider le panier ---------***************************************************************/

const btn_deleteBasket_html = `
<button class ="btn_supprimerPanier"> Vider le panier </button>`;

//insertion du bouton dans le html
  document.getElementById("cart__items").insertAdjacentHTML("beforeend",btn_deleteBasket_html);
    const btn_deleteBasket = document.querySelector(".btn_supprimerPanier");
    btn_deleteBasket.style.width= "100%";
      if (productInLocalStorage == null || productInLocalStorage == undefined){
        btn_deleteBasket.style.display ="none";
        localStorage.clear();
      }
  //suppression key "panier" pour vider LS
  btn_deleteBasket.addEventListener('click', (e)=> {
    e.preventDefault();
    localStorage.removeItem("panier");
    alert("Le panier est désormais vide") 
    window.location.href = "cart.html" 
  })
};
deleteProduct();
 /******************** ------------ Fonction pour calculer le prix total ----------------************************/
 function costTotal (){

  let countTot = [];
  for(let j= 0; j < productInLocalStorage.length; j++){
    const quantityBasket = productInLocalStorage[j].quantity;
    countTot.push(quantityBasket);
    console.log("youyou",countTot);
    
  }
  /******************** -------------  Calcul du nombre d'articles ----------************************/

  const sumQuantityBasket = countTot.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const totalQuantity = document.getElementById("totalQuantity");
  console.log(sumQuantityBasket, "sumQuantityBasket");
      
      if(sumQuantityBasket > 1){
        totalQuantity.insertAdjacentHTML("beforeend", sumQuantityBasket + " " + "articles");
      
      }else if (sumQuantityBasket <= 1){
        totalQuantity.innerText = sumQuantityBasket + " " + "article";
      };
    

/******************** ------------ Calcul du prix total de la commande ---************************/
let costProducts = [];
  
  for(let i = 0; i < productInLocalStorage.length; i++){
    const priceBasket = productInLocalStorage[i].price * productInLocalStorage[i].quantity;
    costProducts.push(priceBasket);
    console.log(priceBasket, "price basket");
   
  }

const sumPriceBasket = costProducts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = sumPriceBasket;

};
costTotal();

/***************** ------------ Modifier la quantité/prix totaux du panier ----------***********************************/

function changeBasket ()
  {
      // Sélectionner l'input
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    let totalQuantity = document.getElementById("totalQuantity");
    if (productInLocalStorage){

    // On écoute l'élément 
  itemQuantity.forEach(element => {
        element.addEventListener("change", (e) =>  
      {         
      // e.preventDefault();

      id = element.dataset._id;
      color = element.dataset.color;
      quantity = parseInt(element.value,10);
    
      let foundElement = [];
     // récupération du panier de produit LS
     let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));  

    productInLocalStorage.forEach(foundElement => {
      
      // si foundElement trouvé on ajoute la nouvelle quantité à l'ancienne
      if (foundElement != null) {
            
        foundElement.quantity = quantity;
        
        console.log(quantity, "miladiou");
        
      }
      else { 
          // sinon on push le panier dans le LS
          productInLocalStorage.push(cart);
          console.log(panier);
      }
      if (id == foundElement._id && color == foundElement.color) {
        //stockage de l'élément dans une variable
        foundElement = element; 
        };   
      })

     
    
          
        //créer une condition si, même id et même couleur que les éléments du panier
    
        localStorage.setItem("panier", JSON.stringify(productInLocalStorage, quantity));
          
        totalQuantity += quantity;  
        alert("Ce produit a bien été modifié");

        location.reload(true);         
        })
      }) 
  }

  let deleteItem = document.querySelectorAll(".deleteItem");
                    deleteItem.forEach(element =>{
                        element.addEventListener('change', (e) => {
                            e.preventDefault();
                            let supId = element.dataset.idElement;
                            let supColor = element.dataset.color;
                            productInLocalStorage = productInLocalStorage.filter(p => p._id !== supId || p.color !== supColor);
                            localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
                            totalQuantity -= quantity
                            location.reload();
                            
                        })
                  })
            }
 changeBasket();

// //**Formulaire**/

// function formulaire() {
//   let form = document.querySelector('.cart__order__form')
//   const NameRegex = new RegExp("^[a-zA-Z  -]+$");
//   const AddressRegex = new RegExp("^[0-9a-zA-Z -,]+$");
//   const EmailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+$")
  
//   form.firstName.addEventListener('change', () => {
//       valideFirstNameRegex(this);
//   })
//   form.lastName.addEventListener('change', () => {
//       valideLastNameRegex(this);
//   })
//   form.address.addEventListener('change', () => {
//       valideAddressRegex(this);
//   })
//   form.city.addEventListener('change', () => {
//       valideCityRegex(this);
      
//   })
//   form.email.addEventListener('change', () => {
//       valideEmailRegex(this);
//   })

//   const valideFirstNameRegex = function () {
//       let firstNameErrorMsg = document.getElementById('firstName').nextElementSibling;

//       if (NameRegex.test(form.firstName.value)) {
//           firstNameErrorMsg.innerHTML = '';
//           console.log("OK");

//       } else {
//           firstNameErrorMsg.innerHTML = 'Saisie invalide';
//           console.log('not ok');
//       }
//   }

//    const valideLastNameRegex = function () {
//       let lastNameErrorMsg = document.getElementById('lastName').nextElementSibling;

//       if (NameRegex.test(form.lastName.value)) {
//           lastNameErrorMsg.innerHTML = '';
//           console.log("OK");

//       } else {
//           lastNameErrorMsg.innerHTML = 'Saisie invalide';
//           console.log('not ok');
//       }
//   }

//    const valideAddressRegex = function () {
//       let addressErrorMsg = document.getElementById('address').nextElementSibling;

//       if (AddressRegex.test(form.address.value)) {
//           addressErrorMsg.innerHTML = '';
//           console.log("OK");

//       } else {
//           addressErrorMsg.innerHTML = 'Saisie invalide';
//           console.log('not ok');
//       }
//   }

//       const valideCityRegex = function () {
//       let cityErrorMsg = document.getElementById('city').nextElementSibling;

//       if (NameRegex.test(form.city.value)) {
//           cityErrorMsg.innerHTML = '';
//           console.log("OK");

//       } else {
//           cityErrorMsg.innerHTML = 'Saisie invalide';
//           console.log('not ok');
//       }
//   }


//        const  valideEmailRegex = function () {
//       let emailErrorMsg = document.getElementById('email').nextElementSibling;

//       if (EmailRegex.test(form.email.value)) {
//           emailErrorMsg.innerHTML = '';
//           console.log("OK");

//       } else {
//           emailErrorMsg.innerHTML = 'Saisie invalide';
//           console.log('not ok');
//       }
//   }

// }

// formulaire();
//  CONDITIONS POUR VALIDER LA COMMANDE
  
  //   const sendOrder = async function () {
  //     const options = {
  //         method: "POST",
  //         body: JSON.stringify(order),
  //         headers: {
  //             'Accept': 'application/json',
  //             "Content-Type": "application/json"
  //         },
  //     }
  //     fetch("http://localhost:3000/api/products/order", options)
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //         localStorage.clear();
  //         localStorage.setItem("orderID", data.orderId);
  //         window.location.href = 'confirmation.html?id='+ data.orderId;
  //     })
  //     .catch((err) => console.log('Erreur : ' +err));
  // }

  // sendOrder(order);
        

/*******--------- Old method maj le total ---------- ************************/

//  function maj_total ()
//  {
//    if(productInLocalStorage){
//      let totalPrice = 0;
//      let totalQuantity = 0;
//      productInLocalStorage.forEach(element => {
//        totalQuantity += element.quantity;
//        totalPrice += element.price;
//      });
 
/***********************-------- Old Method -------- *********************/
// Ecoute la validation de la commande lors de l'envoi du formulaire
// document.getElementById("order").addEventListener("click",function(){
//     //champs à compléter

//     var valid = true;
//     for(let input of document.querySelectorAll(".form")){
//         valid = valid && input.reportValidity();
//         if(!valid){
//             break;
//         }
//     }
    // if(valid){
    //     if (window.confirm('Votre commande a bien été prise en compte')){
    //     window.location.href = "confirmation.html?id=" ;
    //     }
    // }
    // }
          }