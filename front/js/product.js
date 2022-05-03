//Récupérer l'url
function getId() {
    let onUrl= window.location.href;
    let url = new URL(onUrl);
    return url.searchParams.get("id");
}
console.log(getId);

//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch('http://localhost:3000/api/products/' + getId())

// First Promise: si on obtient une réponse
 .then((res) => { 
     if (res.ok) {
       return res.json();
     }  
     })

 // Deuxième promise
 .then(function getOneKanap () {
    //let productInLocalStorage = JSON.parse(localStorage.getItem("products"));
    createOneKanapCard(kanap);
    addToLocalStorage(kanap);
    loopForColor(kanap);
    //getBasket();
    //addBasket(kanap);
    //loopForTotalQty(productInLocalStorage);

    })
 
 function createOneKanapCard(kanap) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    let select = document.getElementById("colors");
    let quantite = document.querySelectorAll('itemQuantity');
    

    itemsimg.appendChild(image);

    titrepage = kanap.name;
    document.title = titrepage;
    image.src = kanap.imageUrl;
    image.alt = kanap.altTxt;
    nomskanap.innerHTML = kanap.name;
    prix.innerHTML = kanap.price;
    description.innerHTML = kanap.description;
    select = kanap.select;
    quantite = kanap.quantity;
    price = kanap.price;
 
    
 
//Fenêtre pop-up de confirmation
const confirmation = () => {
    if (window.confirm('Votre commande est bien ajoutée au panier.')) {
        window.location.href = "cart.html?id=" + kanap._id;
    }

//Ajout du produit au panier - gestion de l'évenement click
    const bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", (event) => {
        confirmation();
    });
}
    
// //Localstorage
// // Stocker la récupération des valeurs du formulaire dans le localstorage

// //déclaration de la variable

// function addToLocalStorage(kanap){
//     localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
//     console.log(addToLocalStorage);
// }

// function getBasket() {   
// let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
// console.log(productInLocalStorage);                           
// if(productInLocalStorage == null){                      // S'il n'y a pas déjà de produit enregistré
//     return [];               
// }else{
//     productInLocalStorage.push(kanap);
//     return JSON.parse(productInLocalStorage);           // S'il y a déjà un produit enregistré
//     }
// }

// function addBasket(kanap){
//     let productInLocalStorage = getBasket();
//     let foundProduct = productInLocalStorage.find((kanap) => kanap._id == _id);
//     if (foundProduct != undefined){
//         foundProduct.quantite++;
//     }else{
//         kanap.quantite = 1;
//         productInLocalStorage.push(kanap);
//     }
// addBasket(addToLocalStorage);
// }
// }
//Déclaration de la variable
//Récupération du panier

function addToLocalStorage(kanap) {   
    let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
    console.log(productInLocalStorage);                                 
    if(productInLocalStorage) {                  // S'il y a déjà un produit enregistré dans le panier, ajouter produits
    productInLocalStorage.push(kanap);
    localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
    }else{                                      // S'il n'y a pas déjà de produit enregistré, envoyer array vide et ajouter produits
        productInLocalStorage = [];
        productInLocalStorage.push(kanap);
        localStorage.setItem('panier', JSON.stringify(productInLocalStorage)); 
        }
        
    }
    addToLocalStorage (createOneKanapCard);
}
 

/*function loopForTotalQty(productInLocalStorage) {
    let sumQty = 0;
    if (productInLocalStorage === null) {
          cart.innerText = `Panier`;
    } else {
          for (let productInLocalStorage of products) {
                sumQty = sumQty + productInLocalStorage.quantite;
          }
          if (sumQty >= 1) {
                cart = document.getElementById("cart");
                cart.innerText = `Panier (${sumQty})`;
          }
    }
}*/
// function loopForColor(kanap){
//         for (let i = 0; i < kanap.colors.length; i++) {
//             const option = document.createElement("option");
//             colors.appendChild(option);
//             option.value = kanap.colors[i];
//             option.innerText = kanap.colors[i];
//         }}
//     }