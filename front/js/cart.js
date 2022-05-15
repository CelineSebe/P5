let productInLocalStorage= JSON.parse(localStorage.getItem("panier"));
//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch('http://localhost:3000/api/products/')
.then(function(response) {
        return response.json();
  })
// //Si l'API ne répond pas
.catch(function(err) {
    console.log(err)
  })

// //2ème promesse: obtenir dans le DOM les items avec Id
  .then(function getTheBasket() {
      //Sélection de l'iD dans le document
      // const quantityForm = document.getElementById("quantity");
      // const choixQuantity = quantityForm.value;
    
    basketSelection();
    basketBlock();
  })


// //Fonction pour l'affichage du panier//


function basketSelection(product) {

if (product === null) {
    const panierVide = `
    <article class="cart__item ">
        <div id="cart__item__content">
            <p> Votre panier est vide <p>
        </div>
    </article> `;
    const emptyBasket = document.querySelector("#card_setting")
    emptyBasket.innerHTML = "Votre panier est vide";


}else{
    let structureBasket = [];
    //si le localstorage n'est pas vide
    for (j = 0; j < product.length; j++){
        structureBasket = structureBasket + `
        <article class="cart__item" data-id="${product[j]._id}" data-color="${product[j].colors}">
                <div class="cart__item__img">
                  <img src=${product[j].imageUrl} alt="${product[j].altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product[j].name}</h2>
                    <p>${product[j].colors}</p>
                    <p>${product[j].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${product[j].quantite} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `
              ;
    }
    if (j === product.length){
      let cart__items = document.getElementById("cart_items");
      cart__items.innerHTML = structureBasket;
    }


let product = JSON.parse(localStorage.getItem("panier"));

const card = basketSelection(product);
const cart__items = document.querySelector("#cart__items");
cart__items.appendChild(card);

const article = document.createElement ("article");
card.appendChild(article);

const cart__items__img = document.createElement("div");
const image = document.createElement ("img");
cart__items__img.appendChild(image);
cart__items__img.src = product.imageUrl;
cart__items__img.alt = product.altTxt;

  }

document.getElementById("order").addEventListener("click",function(){
    //champs à compléter


    
    var valid = true;
    for(let input of document.querySelectorAll(".form")){
        valid = valid && input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert ("Votre commande a bien été prise en compte");
        // if (window.confirm('Votre commande est bien ajoutée au panier.')){
        // window.location.href = "confirmation.html?id=" + getId;
        // }
    }
})
};
