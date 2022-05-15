let productInLocalStorage= JSON.parse(localStorage.getItem("panier"));
//Mise en place de l'Api en lien avec l'id du produit sélectionné
async function getProductPrice(id){
    return fetch('http://localhost:3000/api/products/')
    .then(function(response) {
            return response.json();
    })
    //Si l'API ne répond pas
    .catch(function(err) {
        console.log(err)
    })

    // //2ème promesse: obtenir dans le DOM les items avec Id
    .then(function getTheBasket() {
        //Sélection de l'iD dans le document
        // const quantityForm = document.getElementById("quantity");
        // const choixQuantity = quantityForm.value;
        
        basketSelection();
        basketBlock(productInLocalStorage);
    })
}
// //Fonction pour l'affichage du panier//


const card = function basketSelection () {
const cart__items = document.querySelector("#cart__items");
cart__items.appendChild(card);
const article = document.createElement ("article");
card.appendChild(article);

const cart__items__img = document.createElement("div");
const image = document.createElement ("img");
cart__items__img.appendChild(image);
cart__items__img.src = products.imageUrl;
cart__items__img.alt = products.altTxt;
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
