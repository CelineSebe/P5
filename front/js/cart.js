
// Récupération du panier de produit LS
let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
displayBasket();

//Mise en place de l'Api
function getProduct(id)
{
  return fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(response) 
    {
      if (response.ok)
      {
        return response.json();
      }
    })
    // Si l'API ne répond pas
    .catch(function(err) 
    {
      const empty = document.querySelector("#cart__items");
      empty.innerHTML = "";
      const inaccessible = document.createElement("p");
      inaccessible.innerHTML = "Toutes nos excuses, la base de données est inaccessible, revenir plus tard";
      inaccessible.style.fontSize = "20px";
      inaccessible.style.textAlign ="center";
      empty.appendChild(inaccessible);
    })

     //2ème promesse: obtenir les données prix
    .then((data) => 
    {
      // Récupération du prix produit LS
        let kanap = data;
        return kanap.price; 
    });
}
/*******------------- Affichage du panier - Fonction pour l'affichage du panier -------------*****************/


function displayBasket()
{
  const positionProduct = document.getElementById("cart__items");
    //si le localstorage est vide
  if (!productInLocalStorage || productInLocalStorage.length === null || productInLocalStorage.length === 0) 
  {
    positionProduct.innerHTML = "Votre panier est vide";
    const returnHome = document.createElement("p");
    returnHome.innerText = "Vous pouvez retrouver notre gamme d'articles à l'accueil :)";
    positionProduct.appendChild(returnHome);
    positionProduct.style.fontSize = "20px";
    positionProduct.style.textAlign = "center"; 

      /**************__________Construction Cart DOM____________*******/
  }else
  {
    this.structureBasket = [];  
    //si le localstorage n'est pas vide
    if (productInLocalStorage)
    {
      for (let cart in productInLocalStorage)
      { 
      // Création des éléments constituant le panier
        let cart__item = document.createElement("article");
        document.getElementById("cart__items").appendChild(cart__item);
        cart__item.classList.add("cart__item");
        cart__item.setAttribute("data-id", localStorage._id);
        cart__item.setAttribute("data-color", localStorage.color);

        let cart__item__img = document.createElement("div");
        cart__item.appendChild(cart__item__img);
        cart__item__img.classList.add("cart__item__img");
          
        let img = document.createElement("img");
        cart__item__img.appendChild(img);
        img.src = productInLocalStorage[cart].image;
        img.alt = "Photographie d'un canapé";

        let cart__item__content = document.createElement("div");
        cart__item.appendChild(cart__item__content);
        cart__item__content.classList.add("cart__item__content")

        let cart__item__content__description = document.createElement("div");
        cart__item__content.appendChild(cart__item__content__description);
        cart__item__content__description.classList.add("cart__item__content__description")

        let cart__title = document.createElement("h2");
        cart__item__content__description.appendChild(cart__title);
        cart__title.innerHTML =productInLocalStorage[cart].name;

        let paragraphe__color = document.createElement("p");
        cart__title.appendChild(paragraphe__color);
        paragraphe__color.innerHTML = productInLocalStorage[cart].color;

        let paragraphe__price = document.createElement("p");
        cart__title.appendChild(paragraphe__price);
        let price = getProduct(productInLocalStorage[cart]._id)
        .then((data) => 
          {
          paragraphe__price.innerHTML = data + '€';
          })
        let cart__item__content__settings = document.createElement("div");
        cart__item__content.appendChild(cart__item__content__settings);
        cart__item__content__settings.classList.add("cart__item__content__settings");

        let cart__item__content__settings__quantity = document.createElement("div");
        cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
        cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");

        let paragraphe__qty = document.createElement("p");
        cart__item__content__settings__quantity.appendChild(paragraphe__qty);
        paragraphe__qty.innerHTML = `Qté : `;

        let cartInput = document.createElement("input");
        cart__item__content__settings__quantity.appendChild(cartInput);
        cartInput.classList.add("itemQuantity");
        cartInput.type = "number";
        cartInput.name = "itemQuantity";
        cartInput.min = "1";
        cartInput.max = "100";
        cartInput.dataset.idElement = productInLocalStorage[cart]._id;
        cartInput.dataset.color = productInLocalStorage[cart].color;
        cartInput.value = productInLocalStorage[cart].quantity;

        let cart__item__content__settings__delete = document.createElement("div");
        cart__item__content__settings__quantity.appendChild(cart__item__content__settings__delete);
        cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

        let deleteItem = document.createElement("p");
        cart__item__content__settings__delete.appendChild(deleteItem);
        deleteItem.innerText = `Supprimer`;
        deleteItem.dataset._idElement = productInLocalStorage[cart]._id;
        deleteItem.dataset.color = productInLocalStorage[cart].color;
        deleteItem.classList.add("deleteItem");
         
      }
    }
  }
}
  
/***************** ------------ Supprimer l'article ---------************************************************/

function deleteProduct () 
{

  const deleteProd = document.querySelectorAll(".deleteItem");

  // selection du produit supprimé en cliquant sur le texte "supprimer"
  deleteProd.forEach(element => 
  {
    element.addEventListener("click",(e) => 
    {
      e.preventDefault();
      color_delete = element.dataset.color;

      //methode filter pour ne pas sortir de la variable les élements qui ont une couleur différente
      productInLocalStorage = productInLocalStorage.filter(element => element.color !== color_delete);

      // envoi de la variable LS
      localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
      alert("Ce produit vient d'être supprimé")
      window.location.href = "cart.html";
    })
  });

/************************ ------- Vider le panier ---------***************************************************************/

  const btn_deleteBasket_html = `
  <button class ="btn_supprimerPanier"> Vider le panier </button>`;

  //insertion du bouton dans le html
  document.getElementById("cart__items").insertAdjacentHTML("beforeend",btn_deleteBasket_html);
  const btn_deleteBasket = document.querySelector(".btn_supprimerPanier");
  btn_deleteBasket.style.width= "100%";
  if (productInLocalStorage == 0 || productInLocalStorage == undefined)
  {
    btn_deleteBasket.style.display ="none";
    localStorage.clear();
  }
  //suppression key "panier" pour vider LS
  btn_deleteBasket.addEventListener('click', (e)=> 
  {
    e.preventDefault();
    localStorage.removeItem("panier");
    alert("Le panier est désormais vide") 
    window.location.href = "cart.html" 
  }) 
};

deleteProduct();

 /******************** ------------ Fonction pour calculer le prix total ----------------************************/
 
function costTotal ()
{
  /******************** -------------  Calcul du nombre d'articles ----------************************/

  let countTot = [];
  for(let j= 0; j < productInLocalStorage.length; j++)
  {
    const quantityBasket = productInLocalStorage[j].quantity;
    countTot.push(quantityBasket);
    console.log("youyou",countTot);
  }
    
  const sumQuantityBasket = countTot.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let totalQuantity = document.getElementById("totalQuantity");
    
  if(sumQuantityBasket > 1)
  {
    totalQuantity.insertAdjacentHTML("beforeend", sumQuantityBasket + " " + "articles");
  }else
  {
    totalQuantity.innerText = sumQuantityBasket + " " + "article";
  };

  if(sumQuantityBasket > 99)
  {
    alert("Vous devez sélectionner moins de 100 articles");
    localStorage.removeItem(productInLocalStorage);
  };

/******************** ------------ Calcul du prix total de la commande ---************************/
  for (let cart in productInLocalStorage)
  {
    let price = getProduct(productInLocalStorage[cart]._id)     
    .then((data) =>
    {
      let costProducts = [];  
      for(let i = 0; i < productInLocalStorage.length; i++)
      {
        let priceBasket = data * productInLocalStorage[i].quantity;
        costProducts.push(priceBasket);
        console.log(priceBasket, "price basket"); 
      }        
        let totalPrice = document.querySelector("#totalPrice");
        const sumPriceBasket = costProducts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        totalPrice.textContent = sumPriceBasket;

    })
  }
};
costTotal();

/***************** ------------ Modifier la quantité/prix totaux du panier ----------***********************************/

function changeBasket ()
{
    
  if (productInLocalStorage)
  {
    // Gestion des quantités à afficher
    let totalQuantity = document.getElementById("totalQuantity");
    //  Sélectionner l'input
    let cartInput = document.querySelectorAll(".itemQuantity");
    let quantity = parseInt(cartInput.value,10);

    // On écoute l'élément 
    cartInput.forEach(element => 
    {
      element.addEventListener("change", (event) => 
      {
  
        color = element.dataset.color;
        quantity = parseInt(element.value, 10);
        id = element.dataset.idElement;
        
        let foundElement = [];
        // récupération du panier de produit LS
        let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));

       //On cherche le produit sélectionné dans le localStorage
              productInLocalStorage.forEach(foundElement => 
              {
                if (foundElement != null){
                  //stockage de l'élément dans une variable
                  let foundElement = productInLocalStorage.find(p => p.id == element._id);
                  foundElement = element;
                }else{ 
                  // sinon on push le panier dans le LS
                  productInLocalStorage.push(foundElement);
                  };
                
                // si foundElement trouvé on ajoute la nouvelle quantité à l'ancienne               
                if (id == foundElement._id && color == foundElement.color)
                {
                  foundElement.quantity = quantity;
                };             
              })
            
                if (quantity > 0 && quantity < 100)
                {
                  localStorage.setItem("panier", JSON.stringify(productInLocalStorage));             
                }
                  location.reload(true);       
              })  
            })
        
    let deleteItem = document.querySelectorAll(".deleteItem");
    deleteItem.forEach(element =>
    {
      element.addEventListener('change', (e) => 
      {
        e.preventDefault();
        let supId = element.dataset.idElement;
        let supColor = element.dataset.color;
        productInLocalStorage = productInLocalStorage.filter(p => p._id !== supId || p.color !== supColor);
        localStorage.setItem('panier', JSON.stringify(productInLocalStorage));
        totalQuantity -= quantity
        location.reload();                          
      })
    })
  }
}
changeBasket();
  
 /********************--------------   Formulaire  ------------------------------------------*******************/

function formulaire () 
{

    // Selection du bloc HTML formulaire
  let form = document.querySelector(".cart__order__form");

    // Assignation des RegExp pour chaque type de saisie possible

    //Ecoute de la modification des input du formulaire
  form.firstName.addEventListener('change', function()
  {
    TextRegex(this);
  });

  form.lastName.addEventListener('change', function()
  {
    TextRegex(this);
  });

  form.address.addEventListener('change', function()
  {
    AddressRegex(this);
  });

  form.city.addEventListener('change', function()
  {
    AddressRegex(this);
  });

  form.email.addEventListener('change', function()
  {
    EmailRegex(this);
  });

    //Fonctions pour valider le formulaire sous condition
    //pour valider le texte
  const TextRegex = function(inputText)
  {

    let Regexp = new RegExp('^[a-z.\'\s éêèàëÉÈÊË\-]{1,25}$', 'gi');
    //Récupérer le p sous l'input
    let textMsg = inputText.nextElementSibling;
    
    //Si FALSE, on définit un message
    if(Regexp.test(inputText.value) === false)
    {
      if(textMsg != null)
      {
          textMsg.innerHTML = "Saisie invalide";
          textMsg.style.color = "#FF6347";
          textMsg.style.fontSize = "20px";
          inputText.style.backgroundColor = "#FF6347";
      }
      return false;
    }else{
        if (textMsg != null)
        {
          textMsg.innerHTML = "Saisie valide";
          textMsg.style.color = "#50C878";
          textMsg.style.fontSize = "20px";
          inputText.style.backgroundColor = "#50C878";
        }
        return true;
    }
  }

  const AddressRegex = function(inputAddress)
  {

    let Regexp = new RegExp('^[a-zA-ZéêèàëÉÈÊË0-9.,-\s ]{2,90}$', 'g');
    //Récupérer le p sous l'input
    let adressMsg = inputAddress.nextElementSibling;
      
    //Si FALSE, on définit un message
      if(Regexp.test(inputAddress.value) === false)
      {
          if(adressMsg != null)
          {
            adressMsg.innerHTML = "Saisie invalide";
            adressMsg.style.color = "#FF6347";
            adressMsg.style.fontSize = "20px";
            inputAddress.style.backgroundColor = "#FF6347";
          }
          return false;
      }else
      {
        if (adressMsg != null)
        {
          adressMsg.innerHTML = "Saisie valide";
          adressMsg.style.color = "#50C878";
          adressMsg.style.fontSize = "20px";
          inputAddress.style.backgroundColor = "#50C878";
        }
          return true;
      }
  }

  const EmailRegex = function(inputEmail)
  {
    let Regexp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    //Récupérer le p sous l'input
    let emailMsg = inputEmail.nextElementSibling;
        
    //Si FALSE, on définit un message
    if(Regexp.test(inputEmail.value) === false)
    {
        if(emailMsg != null)
        {
          emailMsg.innerHTML = "Saisie invalide";
          emailMsg.style.color = "#FF6347";
          emailMsg.style.fontSize = "20px";
          inputEmail.style.backgroundColor = "#FF6347";
        }
          return false;
    }else
    {
        if (emailMsg != null)
        {
          emailMsg.innerHTML = "Saisie valide";
          emailMsg.style.color = "#50C878";
          emailMsg.style.fontSize = "20px";
          inputEmail.style.backgroundColor = "#50C878";
        }
          return true;
    }
  };

  let commandBtn = document.querySelector(".cart__order__form__submit");

    commandBtn.addEventListener("click", function(e)
    {
      e.preventDefault();

      //Conditions de validation
      let form = document.querySelector(".cart__order__form");
      if (TextRegex (form.firstName) 
      && TextRegex(form.lastName) 
      && TextRegex(form.city) 
      && AddressRegex(address) 
      && EmailRegex(email))
      {
        
        let result = true;
        let itemQuantity = document.querySelectorAll(".itemQuantity");
        itemQuantity.forEach(element => 
        {
          if (element.value < 1 || element.value > 100) 
          {
            result = false;
          }
        });
          
          if (result) 
          {
            let contacts = 
            {
              firstName : document.querySelector("#firstName").value,
              lastName : document.querySelector("#lastName").value,
              address : document.querySelector("#address").value,
              city : document.querySelector("#city").value,
              email : document.querySelector("#email").value,
            }
              // console.log(contacts);
            let products = [];
            for (let i = 0; i < productInLocalStorage.length; i++) 
            {
              products.push(productInLocalStorage[i]._id);
            };
              console.log(products);
            let order = 
            {
              contact: contacts,
              products: products,
            }
            function sendOrder () 
            {
              const options = 
              {
              method: 'POST',
              body: JSON.stringify(order),
              headers: 
                    {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
              }
                fetch("http://localhost:3000/api/products/order", options)
                .then(response => response.json())
                .then(data => 
                {
                  console.log(data);
                  localStorage.setItem("orderID", data.orderId);
                  document.location.href = 'confirmation.html?id='+ data.orderId;
                  localStorage.clear();
                })
                .catch((err) => console.log('Erreur : ' +err));
            }
            sendOrder(order);
             
          }else
          {
          alert("Veuillez saisir correctement les champs de ce formulaire, merci")
          }
      }
    })   
}

formulaire();
    