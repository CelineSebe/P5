
//Récupérer l'url
function getId() {
    let onUrl= window.location.href;
    let url = new URL(onUrl);
    return url.searchParams.get("id");
}
// console.log(getId);

//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch('http://localhost:3000/api/products/' + getId())

// First Promise: si on obtient une réponse
 .then((res) => { 
     if (res.ok) {
       return res.json();

    } else {
        console.log('Mauvaise réponse du réseau');
      }
     })

 // Deuxième promise
 .then(function getOneKanap (kanap) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("products"));
    createOneKanapCard(kanap);
    loopForColors(kanap);
    addToLocal(productInLocalStorage);
    // getBasket();
    // addBasket(optionsProduit);
    //loopForTotalQty(productInLocalStorage);
 })
 .catch(function(err) {
    // console.log("Il y a eu un problème: avec l'opération fetch" + error.message);
  });
 
 function createOneKanapCard(kanap) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById("colors");
    

    itemsimg.appendChild(image);

    titrepage = kanap.name;
    // document.title = titrepage;
    image.src = kanap.imageUrl;
    image.alt = kanap.altTxt;
    nomskanap.innerHTML = kanap.name;
    prix.innerHTML = kanap.price;
    description.innerHTML = kanap.description;
    
 };
//Loop pour afficher toutes les options couleurs dans le formulaire

 function loopForColors(kanap) {
    for (let i = 0; i < kanap.colors.length; i++){
        const select = document.getElementById("colors");
        const newOption = new Option(kanap.colors[i]);
        newOption.value = kanap.colors[i];
        select.options.add(newOption);
    }

 };

 //-----------------Localstorage---------------------------//

 // La gestion du panier//

const idForm = document.querySelector("#colors");
const nameForm = document.getElementById("title");
const quantityForm = document.getElementById("quantity");
const image = document.querySelector(".item__img");

// let idProduitSelectionne = products.find((kanap) => kanap._id === getId);
// console.log(idProduitSelectionne);
//Sélection du bouton ajouter l'article au panier
const btn_envoyerPanier = document.querySelector("#addToCart");


//Ecouter le bouton et envoyer le panier
const confirmation = () => {
        if (window.confirm('Votre commande est bien ajoutée au panier.')) {
            window.location.href = "cart.html?id=" + getId;
        }
    }
btn_envoyerPanier.addEventListener("click", (e)=>{
    e.preventDefault();
    confirmation();
        
    // Choix de l'option par l'utilisateur dans une variable
const choixForm = idForm.value;
const choixQuantity = quantityForm.value;

// Stocker la récupération des valeurs du formulaire dans le localstorage
let optionsProduit = {
    _id: getId(),
    name: nameForm,
    colors: choixForm,
    quantite: choixQuantity,
    imageUrl: image.src,
    altTxt: image.alt,
};
console.log(optionsProduit);

//function ajout produit localstorage
const addToLocalStorage = () => {
    productInLocalStorage.push(optionsProduit);
    localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
    // let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
};

//s'il y a des produits dans le localstorage
if(productInLocalStorage){
    confirmation();
    addToLocalStorage();
//s'il n'y ap de produits dans le localstorage
}else{
    productInLocalStorage = [];
    confirmation();
    addToLocalStorage();
}

});


