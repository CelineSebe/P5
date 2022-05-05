
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
     }  
     })

 // Deuxième promise
 .then(function getOneKanap (kanap) {
    // let productInLocalStorage = JSON.parse(localStorage.getItem("products"));
    createOneKanapCard(kanap);
    // addToLocalStorage(productInLocalStorage);
    // getBasket();
    // addBasket(optionsProduit);
    //loopForTotalQty(productInLocalStorage);

 })
 
 function createOneKanapCard(kanap) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById("colors");
    

    itemsimg.appendChild(image);

    titrepage = kanap.name;
    document.title = titrepage;
    image.src = kanap.imageUrl;
    image.alt = kanap.altTxt;
    nomskanap.innerHTML = kanap.name;
    prix.innerHTML = kanap.price;
    description.innerHTML = kanap.description;
    price = kanap.price;
    console.log(kanap.price);
    console.log(kanap);
//Loop pour afficher toutes les options couleurs dans le formulaire
        for (let i = 0; i < kanap.colors.length; i++) {
            const newOption = new Option(kanap.colors[i]);
            newOption.value = kanap.colors[i];
            select.options.add(newOption);
        }
 }

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
    name: nameForm.str,
    colors: choixForm,
    quantite: choixQuantity,
    imageUrl: image.src,
    altTxt: image.alt,
};
console.log(optionsProduit);



let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
console.log(productInLocalStorage);
if(productInLocalStorage){
    productInLocalStorage.push(optionsProduit);
    localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
    // confirmation();
}else{
    productInLocalStorage = [];
    productInLocalStorage.push(optionsProduit);
    localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
    console.log(productInLocalStorage);
    // confirmation();
}
});

