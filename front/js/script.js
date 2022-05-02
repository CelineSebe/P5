
//Requêter l'API

fetch("http://localhost:3000/api/products")
  //1ère promesse: obtenir les données
  .then(function(res){
    if (res.ok){
      return res.json();
  }
})
 
//2ème promesse: obtenir dans le DOM les items avec Id
  .then(function(products) {
    for (kanap of products) {
      let card = createKanapCard(kanap);
      const items = document.getElementById('items');
      items.appendChild(card);
    }
  })
//Si l'API ne répond pas
  .catch(function (err) {
    console.log(err);
  });
  
//Mise en place d'une fonction pour les cards
  function createKanapCard(kanap) {
      const a = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

//Nouvelles classes ajoutées
      h3.classList.add("productName");
      p.classList.add("productDescription");

      image.src = kanap.imageUrl;
      image.alt = kanap.altTxt;
      h3.innerHTML = kanap.name;
      p.innerHTML = kanap.description;
      a.href = "product.html?id=" + kanap._id;
      
//Ajouts des éléments du produit aux éléments parents
//A l'aide propriété appendChild
      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    
    return a;
    }