
//Récupérer l'id dans un lien grâce aux variables params

let params = new URL(location.href).searchParams;
let id = params.get("id");

//Mise en place de l'Api en lien avec l'id du produit sélectionné
const getProduct = async function () {
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
            // loopForColors(kanap);
            // add();
            const image = document.createElement('img');
            const items = document.querySelector('.item__img')
            items.appendChild(image);
            const nomskanap = document.getElementById('title');
            const prix = document.getElementById('price');
            const description = document.getElementById('description');
            const select = document.getElementById("colors");
    

            image.src = kanap.imageUrl;
            image.alt = "Photographie d'un canapé";
            nomskanap.innerHTML = kanap.name;
            prix.innerHTML = kanap.price;
            description.innerHTML = kanap.description;
        
        //Loop pour afficher toutes les options couleurs dans le formulaire

            // function loopForColors(kanap) {
                for (let i = 0; i < kanap.colors.length; i+=1){
                    let option = kanap.colors[i];
                    choiceColor = document.createElement("option");
                    choiceColor.textContent = option;
                    choiceColor.value = option;
                    select.appendChild(choiceColor);
                    }
            // }

           
/**************************-----------------Localstorage------------------------***********************/
    
    const add = function () {
       
         //Sélection du bouton ajouter l'article au panier
        let btnSendBasket = document.querySelector("#addToCart");

        // Ecouter le bouton et l'envoyer au panier dans le local storage
        btnSendBasket.addEventListener('click', (e) => {
            e.preventDefault();
            let choiceColor = (document.querySelector("#colors").selectedOptions[0].value);
            let choixQuantity = parseInt(document.querySelector("#quantity").value, 10);

/****************************** ----------- OLD METHODE -------------  *********************************/
            // const confirmation = () => {
            //     if (window.confirm('Votre commande est bien ajoutée au panier.')) {
            //         window.location.href = `./cart.html`;
            //         }
            //     }
            //     confirmation ();


/****************************** ------- La gestion du panier--------- ***********************************/

            // Stocker la récupération des valeurs du formulaire dans le localstorage
            
            if (choixQuantity > 0 && choixQuantity <100 && colors.value != 0) 
            {
                let optionsProduit = {
                    color: choiceColor,
                    quantity: parseInt(choixQuantity,10),
                    _id: id,
                    name: kanap.name,     
                    image: kanap.imageUrl,
                    };


                    addToCart.innerText = `Ajouté !`;
                    setTimeout(function (){
                        addToCart.innerText = "Ajouter au panier";
                    }, 4000);

                // récupération du panier de produit LS
                let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
                
                // si le local storage est vide, on récupère un array vide
                if (productInLocalStorage == null){
                        productInLocalStorage = [];
                }

                let foundElement = null;
                // Création d'une boucle forEach
                productInLocalStorage.forEach(element => {

                    //Condition si on a le même id et color dans LS qu'un élément du panier
                    if (id == element._id && choiceColor == element.color){
                        // on stocke l'élément dans la variable foundElement
                        foundElement = element;
                        }
                    });
                    //si foundElement, la nouvelle quantity est ajouté à l'ancienne
                    if (foundElement != null) {
                        foundElement.quantity = foundElement.quantity + choixQuantity;
                    //sinon on ajoute une ligne au panier dans LS
                    }else{
                        productInLocalStorage.push(optionsProduit);
                    } 
                
                //envoie du panier au LS
                localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
                
            }

        })
    } 
    add();  
})
}
getProduct();

