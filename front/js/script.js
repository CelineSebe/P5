
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

  function displayProduct(kanap) {
      const a = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      h3.classList.add("productName");
      p.classList.add("productDescription");

      image.src = kanap.imageUrl;
      image.alt = kanap.altTxt;
      h3.innerText = kanap.name;
      p.innerText = kanap.description;
      a.href = "product.html?id=" + kanap._id;

      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    
    return a;
    }