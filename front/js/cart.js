
//Récupérer l'url
function getId() {
    let onUrl= window.location.href;
    let url = new URL(onUrl);
    return url.searchParams.get("id");
}

//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch('http://localhost:3000/api/products/' + getId())
.then((res) => {
    if(res.ok){
        return res.json();
    }
})

//2ème promesse: obtenir dans le DOM les items avec Id
  .then(function getOneBasket(products) {
      // Sélection de l'iD dans le document//
    const cart__items = document.getElementById("cart__items");
    const card = basketSelection(products);
    cart__items.appendChild(card);
  })
//Si l'API ne répond pas
  .catch(function (err) {
    console.log(err);
  });

//Fonction pour l'affichage du panier//
function basketSelection(products) {

    const article = document.createElement ("article");
    card.appendChild(article);

    const cart__items__img = document.createElement("div");
    const img = document.createElement ("img");
    cart__items__img.appendChild(img);
    cart__items__img.src = products.imageUrl;
    cart__items__img.alt = products.image.altTxt;
    console.log(basketSelection);

}



const productInLocalStorage = JSON.parse(localStorage.getItem('panier'));  


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
        window.location.href = "confirmation.html?id=" + getId;
    }
}
);