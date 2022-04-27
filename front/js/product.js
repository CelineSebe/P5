//Récupérer l'url
function getId() {
    let str = window.location.href;
    let url = new URL(str);
    return url.searchParams.get("id");
}
console.log(getId);

//Mise en place de l'Api en lien avec l'id du produit sélectionné
fetch('http://localhost:3000/api/products/' + getId())
 .then((res) => res.json())
 .then((products) => {
     displayProduct(products)
 });

 function displayProduct(products) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById("colors");

    itemsimg.appendChild(image);

    titrepage = products.name;
    document.title = titrepage;
    image.src = products.imageUrl;
    image.alt = products.altTxt;
    nomskanap.innerHTML = products.name;
    prix.innerHTML = products.price;
    description.innerHTML = products.description;
    price = products.price;
    console.log(products.price);
    console.log(products);
    for (let e = 0; e < products.colors.length; e++) {
        let newOption = new Option(products.colors[e]);
        newOption.value = products.colors[e];
        select.options.add(newOption);

    };
 
//Ajout du produit au panier - gestion de l'évenement click
    const quantite = document.getElementById('quantity');
    const bouton = document.getElementById('addToCart');
//Fenêtre pop-up de confirmation
    const confirmation = () => {
        if (window.confirm('Votre commande est bien ajoutée au panier.')) {
            window.location.href = "cart.html";
        }
    }

    bouton.addEventListener("click", (event) => {
        confirmation();
     
//Localstorage
// Stocker la récupération des valeurs du formulaire dans le localstorage

//déclaration de la variable
/*option1
function saveBasket(productInLocalStorage){
    localStorage.setItem('basket', JSON.stringify(productInLocalStorage));
    console.log(productInLocalStorage);
}

function getBasket() {   
let productInLocalStorage = JSON.parse(localStorage.getItem('basket'));
console.log(productInLocalStorage);                           
if(productInLocalStorage == null){   
    return [];               
}else{
    return JSON.parse(productInLocalStorage);           // S'il y a déjà un produit enregistré
    }
}

function addBasket(products) {
    let productInLocalStorage = getBasket();
    let foundProduct = productInLocalStorage.find(p => p.id == products.id);
    if (foundProduct != undefined){
        foundProduct.quantite++;
    }else{
        products.quantite = 1;
        productInLocalStorage.push(products);
        }
saveBasket(productInLocalStorage);
    }
 

*/


//déclaration de la variable

let productInLocalStorage = JSON.parse(localStorage.getItem('panier'));

console.log(productInLocalStorage);

                                
if(productInLocalStorage){                  // S'il y a déjà un produit enregistré
productInLocalStorage.push(products);
localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
console.log(productInLocalStorage);
}else{                                      // S'il n'y a pas déjà de produit enregistré
    productInLocalStorage = [];
    productInLocalStorage.push(products)
    localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
    console.log(productInLocalStorage);
    };

    });
    
 }
