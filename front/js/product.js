
//Récupérer l'URL de l'API et l'id grâce aux variables params et id
let params = new URL(location.href).searchParams;
let id = params.get("id");

                        
//Mise en place de l'Api en lien avec l'id du produit sélectionné
const getProduct = async function ()
{
    await fetch(`http://localhost:3000/api/products/${id}`)

    // First Promise: on obtient la réponse sous forme JSON
    .then(function(response) 
    { 
        if(response.ok)
        {
        return response.json();
        }
    })
    .catch(function(err)
    {
        let productLocation = document.querySelector(".item");
        productLocation.innerHTML = "Nous ne parvenons pas à afficher votre produit";
        localStorage.clear();
    })
    // Deuxième promise: fonction afficher le produit et les options associés
    .then(function(api)
    {
        let kanap = api;
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
        function loopForColors() 
        {
            for (let i = 0; i < kanap.colors.length; i+=1)
            {
                let option = kanap.colors[i];
                choiceColor = document.createElement("option");
                choiceColor.textContent = option;
                choiceColor.value = option;
                select.appendChild(choiceColor);
            }
        }
        loopForColors();

/**************************-----------------Localstorage------------------------***********************/

        function add()
        {
            //Sélection du bouton ajouter l'article au panier
            let btnSendBasket = document.querySelector("#addToCart");
            
            // Ecouter le bouton et l'envoyer au panier dans le local storage
            btnSendBasket.addEventListener('click', (e) => 
            {
            e.preventDefault();
            let choiceColor = document.querySelector("#colors").selectedOptions[0].value;
            let choiceQuantity = document.querySelector("#quantity").valueAsNumber;
      
        /****************************** ------- La gestion du panier--------- ***********************************/

            // Stocker la récupération des valeurs du formulaire dans le localstorage
                  
                // récupération du panier de produit LS
                let products = JSON.parse(localStorage.getItem("panier"));

                if (choiceQuantity >= 100 
                || choiceQuantity <= 0 
                || !colors.value) 
                { 
                    // localStorage.clear();
                    alert("Veuillez choisir une couleur et une quantité correcte entre 1 et 100");
                }else
                {
                    let optionsProduit = 
                    {
                    color: choiceColor,
                    quantity: choiceQuantity,
                    _id: id,
                    name: kanap.name,     
                    image: kanap.imageUrl,
                    };

                    addToCart.innerText = `Ajouté !`;
                    setTimeout(function ()
                    {
                        addToCart.innerText = "Ajouter au panier";
                    }, 3000);
                        
                    // si le local storage est vide, on récupère un array vide
                    if (products == null )
                    {
                        products = [];
                    }
                    let foundElement = null;
                    // Création d'une boucle forEach
                    products.forEach(element => 
                    {
                    //Condition si on a le même id et color dans LS qu'un élément du panier
                        if (id == element._id && choiceColor == element.color)
                        {
                        // on stocke l'élément dans la variable foundElement
                            foundElement = element;
                        }
                    });
                    
                    //si foundElement, la nouvelle quantity est ajouté à l'ancienne
                    if (foundElement != null) 
                    {
                    foundElement.quantity = foundElement.quantity + choiceQuantity;
                    
                    //sinon on ajoute une ligne au panier dans LS
                    }else
                    {
                        products.push(optionsProduit);    
                    }  

                    if (foundElement != null && foundElement.quantity > 99){
                        alert("Vous ne pouvez pas ajouter d'articles");
                    }else{
                    //envoi du panier au LS
                    localStorage.setItem("panier", JSON.stringify(products)); 
                    }              
                }
            })
        }
        add();
    })
}
getProduct();




