// Récupération du panier de produit LS
let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
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
        deleteProduct();
    })    
    // Si l'API ne répond pas
    // .catch(function(err) {
    //  const empty = document.querySelector("#cart_setting").innerHTML = "<h1>Votre panier est vide</h1>";
    //  const inaccessible = document.createElement("p").innerText = "Toutes nos excuses, la base de données est inaccessible, revenir plus tard";
    //  empty.appendChild(inaccessible);
    // });

/*******------------- Affichage du panier - Fonction pour l'affichage du panier -------------*****************/
function getBasket(){
    const positionProduct = document.getElementById("cart__items");
      //si le localstorage est vide
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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}">
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
/***************** ------------ Supprimer l'article ---------************************************************/
deleteProduct();

function deleteProduct(){
const deleteProd = document.querySelectorAll(".deleteItem");

// selection de l'ID supprimé en cliquant sur le bouton
for (let i =0; i < deleteProd.length; i++ ){
deleteProd[i].addEventListener("click",(e) => {
  e.preventDefault();
  let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
  let id_delete = productInLocalStorage[i]._id;

  //methode slice pour extraire une chaîne de caractère et la retourne comme une nouvelle chaîne de caractères
  productInLocalStorage = productInLocalStorage.filter(element => element._id !== id_delete);
  console.log(productInLocalStorage);
  // envoi de la variable LS
  localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
  alert("Ce produit vient d'être supprimé")
  window.location.href = "cart.html";
  })
}

};
// /***************** ------------ Fonction pour mettre à jour les quantités ----------- ***********************/
// function changeQuantity() {
//   const positionProduct = document.getElementById("cart__items");
//   // manière de regarder ce que l'on a d'affiché dynamiquement grace au dataset
//   // On écoute ce qu'il se passe dans itemQuantity de l'article concerné
//   positionProduct.forEach((positionProduct) => {
//     positionProduct.addEventListener("change", (eq) => {
//       // vérification d'information de la valeur du clic et son positionnement dans les articles
      
//           totalProduit();
//         });
//     });
//   };


// /*****-------- fonction ajout nombre total produit et coût total ------*********/

// function totalProduit() {
//   let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
//   // déclaration variable en tant que nombre
//   let totalArticle = 0;
//   // déclaration variable en tant que nombre
//   let prixCombiné = 0;
//   // déclaration variable en tant que nombre
//   let totalPrix = 0;
//   // j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total
//   for (let article of productInLocalStorage) {
//     totalArticle += JSON.parse(article.quantité);
//     prixCombiné = JSON.parse(article.quantité) * JSON.parse(article.prix);
//     totalPrix += prixCombiné;
//   }
//   // je pointe l'endroit d'affichage nombre d'article
//   document.getElementById("totalQuantity").textContent = totalArticle;
//   // je pointe l'endroit d'affichage du prix total
//   document.getElementById("totalPrice").textContent = totalPrix;
// }
// Ecoute la validation de la commande lors de l'envoi du formulaire
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
        window.location.href = "confirmation.html" ;
        }
    }
})