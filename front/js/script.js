
//appeler l'API

fetch("http://localhost:3000/api/products")
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  })
 
//Kanap Mise en place des produits
  .then((products) => {
    for (kanap of products) {
      let elementProduct = displayProduct(kanap);
      const items = document.getElementById('items');
      items.appendChild(elementProduct);
    }
  });
//DOM Objet affichage des éléments des produits
  function displayProduct(kanap) {
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
      
//Ajouts des éléments du produit au parent ITEM
      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    
    return a;
    }