const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
/*
const products= {
  colors: ["Mes couleurs"],
  __id: "Le code",
  name: "Le nom du canapé",
  price: "Le prix du canapé",
  imageUrl: "la photo du canapé",
  description: "la description du canapé",
  altTxt: "alt de la photo",
}
function () {
  fetch("")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    document
        .getElementById("products")
        .innerText = value.queryString.greetings;
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}

document
  .getElementById("products")
*/
/*fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    products.forEach((kanap) => {
      const items = document.querySelector(".items");
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
    });
  });
*/