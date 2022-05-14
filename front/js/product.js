
//Récupérer l'id dans un lien grâce aux variables params

let params = new URL(location.href).searchParams;
let id = params.get("id");

getProduct();

//Mise en place de l'Api en lien avec l'id du produit sélectionné
async function getProduct() {
    await fetch(`http://localhost:3000/api/products/${id}`)

        // First Promise: on obtient la réponse sous forme JSON
        .then(function(response) { 
            return response.json();
        })
        .catch(function(err) {
        let productLocation = document.querySelector(".item");
        productLocation.innerHTML = "Nous ne parvenons pas à afficher votre produit";
        })

        // Deuxième promise: fonction afficher le produit et les options associés
        .then(function (api){
            //  let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
            let kanap = api;
            // createOneKanapCard(kanap);
            loopForColors(kanap);
            add();
            const image = document.createElement('img');
            const items = document.querySelector('.item__img')
            items.appendChild(image);
            const nomskanap = document.getElementById('title');
            const prix = document.getElementById('price');
            const description = document.getElementById('description');
            // const select = document.getElementById("colors");
    

            image.src = kanap.imageUrl;
            image.alt = "Photographie d'un canapé";
            nomskanap.innerHTML = kanap.name;
            prix.innerHTML = kanap.price;
            description.innerHTML = kanap.description;
        
        //Loop pour afficher toutes les options couleurs dans le formulaire

            function loopForColors(kanap) {
                for (let i = 0; i < kanap.colors.length; i++){
                    const select = document.getElementById("colors");
                    let option = kanap.colors[i];
                    productColor = document.createElement("option");
                    productColor.textContent = option;
                    productColor.value = option;
                    select.appendChild(productColor);
                    }
            }

           

    //-----------------Localstorage---------------------------//
    add();

    function add() {
       
         //Sélection du bouton ajouter l'article au panier
        let btnSendBasket = document.querySelector("#addToCart");
        // Ecouter le bouton et l'envoyer au panier dans le local storage
        btnSendBasket.addEventListener('click', (e) => {
            e.preventDefault();
            let choiceColor = document.querySelector("#colors").selectedOptions[0].value;
            let choixQuantity = parseInt(document.querySelector("#quantity").value, 10);
            const confirmation = () => {
                if (window.confirm('Votre commande est bien ajoutée au panier.')) {
                    window.location.href = `./cart.html?id=${id}`;
                    }
                confirmation ();
                }
            
        // La gestion du panier//

            // Stocker la récupération des valeurs du formulaire dans le localstorage
            if (choixQuantity > 0 && choixQuantity <100 && colors.value != 0) 
            {
                let optionsProduit = {
                    _id: id,
                    name: kanap.name,
                    color: choiceColor,
                    quantity: parseInt(choixQuantity, 10),
                    image: kanap.imageUrl,
                    };
                // function ajout produit localstorage
        
                let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
                
                // si le local storage est vide, on récupère un array vide
                if (productInLocalStorage == null){
                        productInLocalStorage =[];
                }

                let foundElement = null;
                // On crée une boucle 
            
                productInLocalStorage.forEach(element => {
                    //Condition si on a le même id et color dans LS qu'un élément du panier
                    if (id == element.id && choiceColor == element.color){
                        // on stocke l'élément dans la variable foundElement
                        foundElement = element;
                    }
                });
                //si foundElement, la nouvelle quantity est ajouté à l'ancienne
                if(foundElement != null) {
                    foundElement.quantity == foundElement.quantity + quantity;
                //sinon on ajoute une ligne au panier dans LS
                }else{
                    productInLocalStorage.push(optionsProduit);
                } 
                //send du panier au LS
                localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
            }

        })
    }   
})
}

