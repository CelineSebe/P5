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
        costTotal();
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
      voirAccueil.innerText = "Vous pouvez retrouver notre gamme d'articles à l'accueil :)";
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
                    <p>Qté : </p>
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

// selection du produit supprimé en cliquant sur le texte "supprimer"
for (let i =0; i < deleteProd.length; i++ ){
deleteProd[i].addEventListener("click",(e) => {
  e.preventDefault();
  // let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
  let color_delete = productInLocalStorage[i].color;

  //methode filter pour ne pas sortir de la variable les élements qui ont une couleur différente
  productInLocalStorage = productInLocalStorage.filter(element => element.color !== color_delete);
  console.log(productInLocalStorage);
  // envoi de la variable LS
  localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
  alert("Ce produit vient d'être supprimé")
  window.location.href = "cart.html";
  })
}

/************************ ------- Vider le panier ---------***************************************************************/
const btn_deleteBasket_html = `
<button class ="btn_supprimerPanier"> Vider le panier </button>`;

//insertion du bouton dans le html
document.getElementById("cart__items").insertAdjacentHTML("beforeend",btn_deleteBasket_html);
const btn_deleteBasket = document.querySelector(".btn_supprimerPanier");
btn_deleteBasket.style.width= "100%";
if (productInLocalStorage == null || productInLocalStorage == undefined){
  btn_deleteBasket.style.display ="none";
}
  //suppression key "panier" pour vider LS
  btn_deleteBasket.addEventListener('click', (e)=> {
    e.preventDefault();
    localStorage.removeItem("panier");
    alert("Le panier est désormais vide") 
    window.location.href = "cart.html" 
  })
};

  /******************** ------------ Fonction pour calculer le prix total ----------------************************/
  function costTotal (){
    let costProducts = [];
    
    for(let i = 0; i < productInLocalStorage.length; i++){
      let priceBasket = productInLocalStorage[i].price * productInLocalStorage[i].quantity;
      costProducts.push(priceBasket);
      console.log(priceBasket);
    }
  
  /******************** -------------  Calcul du nombre d'articles ----------************************/
  
    let countTot = [];
    for(let j= 0; j < productInLocalStorage.length; j++){
      let quantityBasket = productInLocalStorage[j].quantity;
      countTot.push(quantityBasket);
      console.log(countTot);
    }
    let sumQuantityBasket = countTot.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalQuantity = document.getElementById("totalQuantity");
    console.log(sumQuantityBasket);
        if(sumQuantityBasket > 1){
          totalQuantity.insertAdjacentHTML("beforeend", sumQuantityBasket + " " + "articles");
        }else{
          totalQuantity.textContent = "1 article";
        };

  /********************** ------------ Calcul du prix total de la commande ---************************/
  
  let sumPriceBasket = costProducts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = sumPriceBasket;

  };


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
        if (window.confirm('Votre commande a bien été ajoutée au panier.')){
        window.location.href = "confirmation.html" + _id ;
        }
    }
})