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
    .then(function createBasket() {
        getBasket();
        deleteProduct();
        costTotal();
        add();
        // maj_total();
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
      const returnHome = document.createElement("p");
      returnHome.innerText = "Vous pouvez retrouver notre gamme d'articles à l'accueil :)";
      positionProduct.appendChild(returnHome);
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

/***************** ------------ Modifier la quantité/prix totaux du panier ----------***********************************/

function add ()
  {
      // Sélectionner l'input
    let inputQuantity = document.querySelectorAll(".itemQuantity");
    let totalQuantity = document.getElementById("totalQuantity");
    if (productInLocalStorage){

    // On écoute l'élément 
  inputQuantity.forEach(element => {
        element.addEventListener("change", (e) =>  
      { 
        
      // e.preventDefault();
      // let totalPrice = document.getElementById("totalPrice");
      // let quantity = parseInt(inputQuantity.value,10);
      
      id = element.dataset._id;
      color = element.dataset.color;
      quantity = parseInt(element.value,10);
    
      let foundElement = [];
    // // récupération du panier de produit LS
    // let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));  

    productInLocalStorage.forEach(foundElement => {
      
    
          // si foundElement trouvé on ajoute la nouvelle quantité à l'ancienne
          if (foundElement != null) {
            
            foundElement.quantity = quantity;
            // quantity += 1;
            
            console.log(quantity, "miladiou");
          }

            //créer une condition si, même id et même couleur que les éléments du panier
      if (id == foundElement.id && color == foundElement.color) {
        //stockage de l'élément dans une variable
        foundElement = element; 
        };   
      })
        
          localStorage.setItem("panier", JSON.stringify(productInLocalStorage, quantity));
          alert("ce produit vient d'être ajouté au panier");
          totalQuantity += quantity;    
          location.reload(true);
   
      })
    
  })
}
}
 add();

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
        if (window.confirm('Votre commande a bien été prise en compte')){
        window.location.href = "confirmation.html" + _id ;
        }
    }
})

/*******--------- Fonction pour maj le total ---------- ************************/

//  function maj_total ()
//  {
//    if(productInLocalStorage){
//      let totalPrice = 0;
//      let totalQuantity = 0;
//      productInLocalStorage.forEach(element => {
//        totalQuantity += element.quantity;
//        totalPrice += element.price;
//      });
 

