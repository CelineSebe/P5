
//Requêter l'API

fetch("http://localhost:3000/api/products")
  //1ère promesse: obtenir les données de l'api
  .then(function(response){
    if (response.ok){
      return response.json();
    }
  })
//Si l'API ne répond pas
  .catch(function (err) { 
    let productLocation = document.querySelector(".items");
    productLocation.innerHTML = "Nous ne parvenons pas à afficher vos produits";
})
 
//2ème promesse: créer les card produit, dans le DOM avec Id 
  .then(function(products) {
    // boucle pour obtenir chacun des produits
    for (kanap of products) {
      const card = createKanapCard(kanap);
      const items = document.getElementById('items');
      items.appendChild(card);
    }
  })
  
//Mise en place d'une fonction pour l'organisation de la card produit
  function createKanapCard(kanap) {
  //création des éléments dans le DOM//
      const items = document.getElementById('items');
      const a = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

  //Nouvelles classes ajoutées
      h3.classList.add("productName");
      p.classList.add("productDescription");
  //association clé-valeur de données de l'api//
      image.src = kanap.imageUrl;
      image.alt = kanap.altTxt;
      h3.innerHTML = kanap.name;
      p.innerHTML = kanap.description;
      a.setAttribute("href", `product.html?id=${kanap._id}`);
      
//Ajouts des éléments du produit aux éléments parents
//Avec propriété appendChild
      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    
    return a;
    }
