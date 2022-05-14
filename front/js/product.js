
//Récupérer l'url

let onUrl= window.location;
let url = new URL(onUrl);
const id = url.searchParams.get("id");


//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch(`http://localhost:3000/api/products/${id}`)

// First Promise: on obtient la réponse sous forme JSON
 .then((res) => { 
     if (res.ok) {
       return res.json();

    } else {
        console.log('Mauvaise réponse du réseau');
      }
     })

 // Deuxième promise: fonction afficher le produit et les options associés
 .then(function (kanap){
    //  let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
    createOneKanapCard(kanap);
    loopForColors(kanap);
    // addToLocalStorage(productInLocalStorage);
    // getBasket();
    // addBasket(optionsProduit);
    //loopForTotalQty(productInLocalStorage);
 
//  .catch(function(err) {
//     // console.log("Il y a eu un problème: avec l'opération fetch" + error.message);
//   })
 });
 function createOneKanapCard(kanap) {
    const image = document.createElement('img');
    const items = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    // const select = document.getElementById("colors");
    
    items.appendChild(image);

    // titrepage = kanap.name;
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
        const select = () => {
            select.innerHTML = kanap.colors;
    }
 };
 
 

 //-----------------Localstorage---------------------------//


//Sélection du bouton ajouter l'article au panier
const btn_envoyerPanier = document.querySelector("#addToCart");


//Ecouter le bouton et envoyer le panier
const confirmation = () => {
        if (window.confirm('Votre commande est bien ajoutée au panier.')) {
            window.location.href = `./cart.html?id=${id}`;
        }
    }

btn_envoyerPanier.addEventListener("click", (e)=>{
    e.preventDefault();
    confirmation();


 // La gestion du panier//

 
 const choixColor = document.getElementById("colors").value;
 const nameForm = document.getElementById("title").value;
 const choixQuantity = document.getElementById("quantity").value;
 const img = document.querySelector(".item__img").value;
 

  // Stocker la récupération des valeurs du formulaire dans le localstorage
  const optionsProduit = {
      _id: id.value,
      name: nameForm,
      colors: choixColor,
      quantite: choixQuantity,
      imageUrl: img.src,
      altTxt: img.alt,
  };
  console.log(optionsProduit);
  
    // function ajout produit localstorage
    const addToLocalStorage = () =>{
        panier.push(optionsProduit);
        localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
        let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
        let panier =[];
}
    //s'il y a des produits dans le localstorage
if(productInLocalStorage){
    confirmation();
    addToLocalStorage();
    
    //s'il n'y ap de produits dans le localstorage
}else{
    panier = [];
    confirmation();
    addToLocalStorage();
        } 
 })  

// //function ajout produit localstorage
// const addToLocal = () => {
//     let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));
//     localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
//     let panier =[];
//     const id = getId();
//     const choixColor = parseInt(document.getElementById("colors").value);
//     let choixQuantity= parseInt(document.getElementById("quantity").value);
 
//     if (productInLocalStorage) {
//         let productExiste = false;

//         for (kanap of panier) {
//             if ( colors == choixColor && id == getId()) {
//                 quantite += choixQuantity;
                
//                 productExiste = true;
//             }
//         }

//         if (!productExiste) {
//             panier.push(
//                 {
//                     "_id": id,
//                     "colors": choixColor,
//                     "quantite": choixQuantity,
                    
//                 }
//             );

//         }
//     } else {
//         panier = [
//             {
//                 "_id": id,
//                 "colors": choixColor,
//                 "quantite": choixQuantity,
               
//             }
//         ]
//     }
//     localStorage.setItem('panier', JSON.stringify(panier));
// }