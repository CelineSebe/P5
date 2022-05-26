// récupération du panier de produit LS
const productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
//Mise en place de l'Api en lien avec l'id du produit sélectionné

 fetch('http://localhost:3000/api/products/')
    .then(function(response) {
      if (response.ok){
        return response.json();
      }
    })
     //2ème promesse: obtenir l'objet JS
    .then(function createBasket() {
        getBasket();
    })    
    // Si l'API ne répond pas
    // .catch(function(err) {
    //  const empty = document.querySelector("#cart_setting").innerHTML = "<h1>Votre panier est vide</h1>";
    //  const inaccessible = document.createElement("p").innerText = "Toutes nos excuses, la base de données est inaccessible, revenir plus tard";
    //  empty.appendChild(inaccessible);
    // });

/******* Affichage du panier - Fonction pour l'affichage du panier************************/
function getBasket(){
    const positionProduct = document.getElementById("cart__items");

    if (productInLocalStorage === null || productInLocalStorage.length === 0) {
      positionProduct.innerHTML = "Votre panier est vide";
      const voirAccueil = document.createElement("p");
      voirAccueil.innerText = "Vous pouvez trouver notre gamme d'articles sur l'accueil :)";
      positionProduct.appendChild(voirAccueil);
      positionProduct.style.fontSize = "20px";
      positionProduct.style.textAlign = "center"; 
       

    }else{
        let structureBasket = [];
        //si le localstorage n'est pas vide
        for (j = 0; j < productInLocalStorage.length; j++){
            structureBasket = structureBasket + `
            <article class="cart__item" data-id="${productInLocalStorage[j]._id}" data-color="${productInLocalStorage[j].colors}">
              <div class="cart__item__img">
                <img src="${productInLocalStorage[j].image}" alt="${productInLocalStorage[j].altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${productInLocalStorage[j].name}</h2>
                    <p>${productInLocalStorage[j].color}</p>
                    <p>${productInLocalStorage[j].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :${productInLocalStorage[j].quantity} </p>
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
        if (j === productInLocalStorage.length){
          document.getElementById("cart_items");
          positionProduct.innerHTML = structureBasket;
        }
      }
    }
getBasket();

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
        if (window.confirm('Votre commande a bien été ajoutée au panier.')){
        window.location.href = "confirmation.html?id=" + _id;
        }
    }
})