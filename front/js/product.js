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
 .then((data) => {
     displayProduct(data)
 });

 function displayProduct(data) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById("colors");

    itemsimg.appendChild(image);

    titrepage = data.name;
    document.title = titrepage;
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    nomskanap.innerHTML = data.name;
    prix.innerHTML = data.price;
    description.innerHTML = data.description;
    price = data.price;
    console.log(data.price);
    console.log(data);
    for (let e = 0; e < data.colors.length; e++) {
        let newOption = new Option(data.colors[e]);
        newOption.value = data.colors[e];
        select.options.add(newOption);

    };

    const quantite = document.getElementById('quantity');
    const bouton = document.getElementById('addToCart');
    const confirmation = () => {
        if (window.confirm(`Votre commande est bien ajoutée au panier.`)) {
            window.location.href = "cart.html";
        }
    }
    bouton.addEventListener("click", (event) => {
        setProductPanier();
        confirmation();

    })

}