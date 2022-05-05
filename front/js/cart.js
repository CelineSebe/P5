
// //Récupérer l'url
// function getId() {
//     let onUrl= window.location.href;
//     let url = new URL(onUrl);
//     return url.searchParams.get("id");
// }

// //Mise en place de l'Api en lien avec l'id du produit sélectionné
// fetch('http://localhost:3000/api/products/' + getId())
// .then((res) => {
//     if(res.ok){
//         return res.json();
//     }
// })

// // //2ème promesse: obtenir dans le DOM les items avec Id
//   .then(function getTheBasket(products) {
      // Sélection de l'iD dans le document//
    
    
    // const quantityForm = document.getElementById("quantity");
    // const choixQuantity = quantityForm.value;
    // const card = basketSelection(products);
    // cart__items.appendChild(card);
//   })
// // //Si l'API ne répond pas
//   .catch(function (err) {
//     console.log(err);
//   });

// // //Fonction pour l'affichage du panier//
// function basketSelection(products) {

const productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
console.log(productInLocalStorage);
const cart__items = document.querySelector("#cart__items");
console.log(cart__items);

if (productInLocalStorage === null) {
    const panierVide = `
    <article class="cart__item ">
        <div id="cart__item__content">
            <p> Votre panier est vide <p>
        </div>
    </article> `
    ;
cart__items.innerHTML = panierVide;

}else{
    let structureBasket = [];
    //si le localstorage n'est pas vide
    for (j = 0; j < productInLocalStorage.length; j++){
        structureBasket = structureBasket + `
        <article class="cart__item" data-id="${productInLocalStorage[j]._id}" data-color="${productInLocalStorage[j].colors}">
                <div class="cart__item__img">
                  <img src=${productInLocalStorage[j].imageUrl} alt="${productInLocalStorage[j].altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInLocalStorage[j].name}</h2>
                    <p>${productInLocalStorage[j].colors}</p>
                    <p>${productInLocalStorage[j].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${productInLocalStorage[j].quantite} </p>
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
        cart__items.innerHTML = structureBasket;
    }
//     getTheBasket(basketSelection);
// };
// }
    // const article = document.createElement ("article");
    // card.appendChild(article);

    // const cart__items__img = document.createElement("div");
    // const img = document.createElement ("img");
    // cart__items__img.appendChild(img);
    // cart__items__img.src = products.imageUrl;
    // cart__items__img.alt = products.image.altTxt;
    // console.log(basketSelection);

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
        // alert ("Votre commande a bien été prise en compte");
        if (window.confirm('Votre commande est bien ajoutée au panier.')){
        window.location.href = "confirmation.html?id=" + productInLocalStorage._id;
        }
    }
}
);